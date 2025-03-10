from flask import Blueprint, Response, jsonify, request, current_app
from flask_restful import Resource, Api
from sqlalchemy.exc import SQLAlchemyError
import bcrypt

from models import db, uporabnik, geslo
from db_utils import (
    selectAllUporabnik,
    get_uporabnik_by_id,
    get_uporabnik_by_email,
    get_geslo_by_email,
    get_geslo_by_uporabnik
)

api_users = Blueprint("api_users", __name__, url_prefix="/api")

#class za pridobivanje, ustvarjanje, spreminjanje in brisanje uporabnikov
class Uporabniki(Resource):
    @staticmethod
    def get():
        data = selectAllUporabnik()
        return jsonify(
            [
                {
                    "idUporabnik": el.idUporabnik,
                    "ime": el.ime,
                    "priimek": el.priimek,
                    "admin": el.admin,
                    "email": el.email,
                }
                for el in data
            ]
        )

    @staticmethod
    def post():
        try:
            data = request.get_json()
            ime = data.get("ime")
            priimek = data.get("priimek")
            admin = data.get("admin")
            email = data.get("email")
            password = data.get("geslo")
            uporabnik1 = get_uporabnik_by_email(email)
            if uporabnik1:
                current_app.logger.error(f"uporabnik with {email} found")
                return Response("uporabnik with same email found", 404)
            else:
                new_uporabnik = uporabnik(
                    ime=ime, priimek=priimek, admin=admin, email=email
                )
                db.session.add(new_uporabnik)
                try:
                    db.session.commit()
                    id = new_uporabnik.idUporabnik
                    hashpassword = bcrypt.hashpw(
                        password.encode("utf-8"), bcrypt.gensalt()
                    )
                    new_geslo = geslo(
                        geslo=hashpassword, uporabnik_idUporabnik=id, email=email
                    )
                    db.session.add(new_geslo)
                    db.session.commit()
                    return Response("OK", 200)
                except SQLAlchemyError as e:
                    db.session.rollback()  # Rollback in case of an error
                return Response("Database error, update failed", 500)
        except Exception as e:
            current_app.logger.error(str(e))
            return Response("Bad Request", 400)

    def put(self):
        data = request.get_json()

        ime = data.get("ime")
        priimek = data.get("priimek")
        admin = data.get("admin")
        idUporabnik = data.get("idUporabnik")

        # current_app.logger.info(f"uporabnik updated: {idUporabnik}")
        uporabnik = get_uporabnik_by_id(idUporabnik)
        if not uporabnik:
            current_app.logger.error(f"uporabnik with ID {idUporabnik} not found")
            return Response("uporabnik not found", 404)

        if not ime:
            current_app.logger.warning("Ime is required")
            return Response("ime are required", 400)
        if not priimek:
            current_app.logger.warning("priimek is required")
            return Response("priimek are required", 400)   

        uporabnik.ime = ime
        uporabnik.priimek = priimek
        uporabnik.admin = admin
        try:
            db.session.commit()
            # current_app.logger.info(f"uporabnik updated: {uporabnik.to_dict()}")
            return Response("OK", 200)
        except SQLAlchemyError as e:
            db.session.rollback()  # Rollback in case of an error
            return Response("Database error, update failed", 500)

    def delete(self):
        data = request.get_json()

        idUporabnik = data.get("idUporabnik")
        # current_app.logger.info(f"uporabnik updated: {idUporabnik}")
        uporabnik = get_uporabnik_by_id(idUporabnik)
        geslo = get_geslo_by_uporabnik(idUporabnik)

        if not uporabnik:
            current_app.logger.error(f"uporabnik with ID {idUporabnik} not found")
            return Response("uporabnik not found", 404)

        db.session.delete(geslo)
        db.session.delete(uporabnik)
        db.session.commit()

        return Response("OK", 200)

#class za login uporabnika
class Login(Resource):
    @staticmethod
    def post():
        try:
            data = request.get_json()
            email = data.get("email")
            _password = data.get("geslo")
            password = _password.encode("utf-8")
            geslo1 = get_geslo_by_email(email)
            if geslo1:
                passToCheck = geslo1.geslo.encode("utf-8")
                if bcrypt.checkpw(password, passToCheck):
                    uporabnik1 = get_uporabnik_by_id(geslo1.uporabnik_idUporabnik)
                    response_data = {"uporabnik": uporabnik1.to_dict()}
                    return jsonify(response_data)
                else:
                    return Response("Wrong password", 200)
            else:
                current_app.logger.error(f"uporabnik with {email} not found")
                return Response("uporabnik with same email not found", 404)
        except Exception as e:
            current_app.logger.error(str(e))
            return Response("Bad Request", 400)


api = Api(api_users)
api.add_resource(Uporabniki, "/uporabniki")
api.add_resource(Login, "/login")
