from flask import Blueprint, Response, jsonify, request, current_app
from flask_restful import Resource, Api
from sqlalchemy.exc import SQLAlchemyError

from models import db, znamka, menjalnik, gorivo, vrata, model
from db_utils import (
    selectAllZnamke,
    get_znamka_by_id,
    selectAllGorivo,
    get_gorivo_by_id,
    selectAllMenjalnik,
    get_menjalnik_by_id,
    selectAllVrata,
    get_vrata_by_id,
    selectAllModel,
    get_model_by_id,
)

db_api = Blueprint("db_api", __name__, url_prefix="/api")

#class za pridobivanje, ustvarjanje, spreminjanje in brisanje znamk
class Znamke(Resource):
    @staticmethod
    def get():
        data = selectAllZnamke()
        return jsonify([{"idZnamka": el.idZnamka, "ime": el.ime} for el in data])

    @staticmethod
    def post():
        try:           
            data = request.get_json()
            name = data.get("ime")
            new_znamka = znamka(ime=name)
            db.session.add(new_znamka)
            try:
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
        znamka_id = data.get("idZnamka")

        # current_app.logger.info(f"Znamka updated: {znamka_id}")
        znamka = get_znamka_by_id(znamka_id)
        if not znamka:
            current_app.logger.error(f"Znamka with ID {znamka_id} not found")
            return Response("Znamka not found", 404)

        if not ime:
            current_app.logger.warning("Ime is required")
            return Response("ime are required", 400)

        znamka.ime = ime
        try:
            db.session.commit()
            # current_app.logger.info(f"Znamka updated: {znamka.to_dict()}")
            return Response("OK", 200)
        except SQLAlchemyError as e:
            db.session.rollback()  # Rollback in case of an error
            return Response("Database error, update failed", 500)

    def delete(self):
        data = request.get_json()

        znamka_id = data.get("idZnamka")
        # current_app.logger.info(f"Znamka updated: {znamka_id}")
        znamka = get_znamka_by_id(znamka_id)

        if not znamka:
            current_app.logger.error(f"Znamka with ID {znamka_id} not found")
            return Response("Znamka not found", 404)

        db.session.delete(znamka)
        db.session.commit()

        return Response("OK", 201)

#class za pridobivanje, ustvarjanje, spreminjanje in brisanje goriva
class Goriva(Resource):
    @staticmethod
    def get():
        data = selectAllGorivo()
        return jsonify([{"idGorivo": el.idGorivo, "ime": el.ime} for el in data])

    @staticmethod
    def post():
        try:
            data = request.get_json()
            name = data.get("ime")
            new_gorivo = gorivo(ime=name)
            db.session.add(new_gorivo)
            try:
                db.session.commit()
                # current_app.logger.info(f'Gorivo updated: {gorivo}')
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
        idGorivo = data.get("idGorivo")

        # current_app.logger.info(f"Gorivo updated: {idGorivo}")
        gorivo = get_gorivo_by_id(idGorivo)
        if not gorivo:
            current_app.logger.error(f"Gorivo with ID {idGorivo} not found")
            return Response("Gorivo not found", 404)

        if not ime:
            current_app.logger.warning("Ime is required")
            return Response("ime are required", 400)

        gorivo.ime = ime
        try:
            db.session.commit()
            # current_app.logger.info(f"Gorivo updated: {gorivo.to_dict()}")
            return Response("OK", 200)
        except SQLAlchemyError as e:
            db.session.rollback()  # Rollback in case of an error
            return Response("Database error, update failed", 500)

    def delete(self):
        data = request.get_json()

        idGorivo = data.get("idGorivo")
        # current_app.logger.info(f"Gorivo updated: {idGorivo}")
        gorivo = get_gorivo_by_id(idGorivo)

        if not gorivo:
            current_app.logger.error(f"gorivo with ID {idGorivo} not found")
            return Response("gorivo not found", 404)

        db.session.delete(gorivo)
        db.session.commit()

        return Response("OK", 200)

#class za pridobivanje, ustvarjanje, spreminjanje in brisanje menjalnika
class Menjalnik(Resource):
    @staticmethod
    def get():
        data = selectAllMenjalnik()
        return jsonify(
            [{"idMenjalnik": el.idMenjalnik, "vrsta": el.vrsta} for el in data]
        )

    @staticmethod
    def post():
        try:
            data = request.get_json()
            name = data.get("vrsta")
            new_menjalnik = menjalnik(vrsta=name)
            db.session.add(new_menjalnik)
            try:
                db.session.commit()
                # current_app.logger.info(f'menjalnik updated: {menjalnik}')
                return Response("OK", 200)
            except SQLAlchemyError as e:
                db.session.rollback()  # Rollback in case of an error
            return Response("Database error, update failed", 500)
        except Exception as e:
            current_app.logger.error(str(e))
            return Response("Bad Request", 400)

    def put(self):
        data = request.get_json()

        vrsta = data.get("vrsta")
        idMenjalnik = data.get("idMenjalnik")

        # current_app.logger.info(f"menjalnik updated: {idMenjalnik}")
        menjalnik = get_menjalnik_by_id(idMenjalnik)
        if not menjalnik:
            current_app.logger.error(f"menjalnik with ID {idMenjalnik} not found")
            return Response("menjalnik not found", 404)

        if not vrsta:
            current_app.logger.warning("vrsta is required")
            return Response("vrsta are required", 400)

        menjalnik.vrsta = vrsta
        try:
            db.session.commit()
            # current_app.logger.info(f'menjalnik updated: {menjalnik.to_dict()}')
            return Response("OK", 200)
        except SQLAlchemyError as e:
            db.session.rollback()  # Rollback in case of an error
            return Response("Database error, update failed", 500)

    def delete(self):
        data = request.get_json()

        idMenjalnik = data.get("idMenjalnik")
        # current_app.logger.info(f"menjalnik updated: {idMenjalnik}")
        menjalnik = get_menjalnik_by_id(idMenjalnik)

        if not menjalnik:
            current_app.logger.error(f"menjalnik with ID {idMenjalnik} not found")
            return Response("menjalnik not found", 404)

        db.session.delete(menjalnik)
        db.session.commit()

        return Response("OK", 200)

#class za pridobivanje, ustvarjanje, spreminjanje in brisanje vrat
class Vrata(Resource):
    @staticmethod
    def get():
        data = selectAllVrata()
        return jsonify(
            [{"idVrata": el.idVrata, "kolicina": el.kolicina} for el in data]
        )

    @staticmethod
    def post():
        try:
            data = request.get_json()
            kol = data.get("kolicina")
            new_vrata = vrata(kolicina=kol)
            db.session.add(new_vrata)
            try:
                db.session.commit()
                # current_app.logger.info(f'vrata updated: {vrata}')
                return Response("OK", 200)
            except SQLAlchemyError as e:
                db.session.rollback()  # Rollback in case of an error
            return Response("Database error, update failed", 500)
        except Exception as e:
            current_app.logger.error(str(e))
            return Response("Bad Request", 400)

    def put(self):
        data = request.get_json()

        kolicina = data.get("kolicina")
        idVrata = data.get("idVrata")

        # current_app.logger.info(f"vrata updated: {idVrata}")
        vrata = get_vrata_by_id(idVrata)
        if not vrata:
            current_app.logger.error(f"vrata with ID {idVrata} not found")
            return Response("vrata not found", 404)

        if not kolicina:
            current_app.logger.warning("kolicina is required")
            return Response("kolicina are required", 400)

        vrata.kolicina = kolicina
        try:
            db.session.commit()
            # print(vrata.to_dict())
            # current_app.logger.info(f'vrata updated: {vrata.to_dict()}')
            return Response("OK", 200)
        except SQLAlchemyError as e:
            db.session.rollback()  # Rollback in case of an error
            return Response("Database error, update failed", 500)

    def delete(self):
        data = request.get_json()

        idVrata = data.get("idVrata")
        # current_app.logger.info(f"vrata updated: {idVrata}")
        vrata = get_vrata_by_id(idVrata)

        if not vrata:
            current_app.logger.error(f"vrata with ID {idVrata} not found")
            return Response("vrata not found", 404)

        db.session.delete(vrata)
        db.session.commit()

        return Response("OK", 200)

#class za pridobivanje, ustvarjanje, spreminjanje in brisanje modela
class Modeli(Resource):
    @staticmethod
    def get():
        _models = selectAllModel()
        _znamke = selectAllZnamke()
        models = []
        znamke = []
        for el in _models:
            models.append(
                {
                    "idModel": el.idModel,
                    "ime": el.ime,
                    "znamkaId": el.znamka_idZnamka,
                    "znamkaName": el.znamka.ime,
                }
            )
        for el in _znamke:
            znamke.append({"idZnamka": el.idZnamka, "ime": el.ime})
        response = {"models": models, "znamke": znamke}
        return jsonify(response)

    @staticmethod
    def post():
        try:
            data = request.get_json()
            name = data.get("ime")
            znamkaId = data.get("znamkaId")
            new_model = model(ime=name, znamka_idZnamka=znamkaId)
            db.session.add(new_model)
            try:
                db.session.commit()
                # current_app.logger.info(f'model updated: {model}')
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
        znamka_idZnamka = data.get("znamkaId")
        idModel = data.get("idModel")

        # current_app.logger.info(f"Model updated: {idModel}")
        model = get_model_by_id(idModel)
        if not model:
            current_app.logger.error(f"model with ID {idModel} not found")
            return Response("model not found", 404)

        if not ime:
            current_app.logger.warning("Ime is required")
            return Response("ime are required", 400)
        if not znamka_idZnamka:
            current_app.logger.warning("znamka_idZnamka is required")
            return Response("znamka_idZnamka are required", 400)

        model.ime = ime
        model.znamka_idZnamka = znamka_idZnamka
        try:
            db.session.commit()
            # current_app.logger.info(f"model updated: {model.to_dict()}")
            return Response("OK", 200)
        except SQLAlchemyError as e:
            db.session.rollback()  # Rollback in case of an error
            return Response("Database error, update failed", 500)

    def delete(self):
        data = request.get_json()

        idModel = data.get("idModel")
        # current_app.logger.info(f"model updated: {idModel}")
        model = get_model_by_id(idModel)

        if not model:
            current_app.logger.error(f"model with ID {idModel} not found")
            return Response("model not found", 404)

        db.session.delete(model)
        db.session.commit()

        return Response("OK", 200)


api = Api(db_api)
api.add_resource(Znamke, "/znamke")
api.add_resource(Goriva, "/goriva")
api.add_resource(Menjalnik, "/menjalniki")
api.add_resource(Vrata, "/vrata")
api.add_resource(Modeli, "/modeli")
