from flask import Blueprint, Response, jsonify, request, current_app
from flask_restful import Resource, Api, reqparse
from sqlalchemy.exc import SQLAlchemyError
import time

from models import db, avto
from db_utils import (
    selectAllZnamke,
    selectAllGorivo,
    selectAllMenjalnik,
    selectAllVrata,
    selectAllModel,
    selectAllAvto,
    selectAllUporabnik,
    get_avto_by_user,
    get_avto_by_id
)

api_avti = Blueprint("api_avti", __name__, url_prefix="/api")

#class za ustvarjanje, spreminjanje in brisanje avta
class Avto(Resource):
    @staticmethod
    def get():
        _modeli = selectAllModel()
        _znamke = selectAllZnamke()
        _goriva = selectAllGorivo()
        _menjalniki = selectAllMenjalnik()
        _vrata = selectAllVrata()
        modeli = []
        znamke = []
        goriva = []
        menjalniki = []
        vrata = []
        for el in _modeli:
            modeli.append(
                {
                    "value": el.idModel,
                    "label": el.ime,
                    "znamkaId": el.znamka_idZnamka,
                    "znamkaName": el.znamka.ime,
                }
            )
        for el in _znamke:
            znamke.append({"value": el.idZnamka, "label": el.ime})

        for el in _goriva:
            goriva.append({"value": el.idGorivo, "label": el.ime})

        for el in _menjalniki:
            menjalniki.append({"value": el.idMenjalnik, "label": el.vrsta})

        for el in _vrata:
            vrata.append({"value": el.idVrata, "label": el.kolicina})

        response = {
            "modeli": modeli,
            "znamke": znamke,
            "goriva": goriva,
            "menjalniki": menjalniki,
            "vrata": vrata,
        }
        return jsonify(response)

    @staticmethod
    def post():
        try:
            data = request.get_json()
            current_timestamp = int(time.time())
            cena = data.get("cena")
            gorivo = data.get("gorivo")
            kilometri = data.get("kilometri")
            letnik = data.get("letnik")
            menjalnik = data.get("menjalnik")
            model = data.get("model")
            opis = data.get("opis")
            pogon4 = data.get("pogon4")
            vrata = data.get("vrata")
            znamka = data.get("znamka")
            idUporabnika = data.get("idUporabnika")
            new_avto = avto(
                letnik=letnik,
                cena=cena,
                opis=opis,
                pogon4=pogon4,
                datumObjave=current_timestamp,
                kilometri=kilometri,
                model_idModel=model,
                model_znamka_idZnamka=znamka,
                gorivo_idGorivo=gorivo,
                vrata_idVrata=vrata,
                menjalnik_idMenjalnik=menjalnik,
                uporabnik_idUporabnik=idUporabnika,
            )
            db.session.add(new_avto)
            try:
                db.session.commit()
                # current_app.logger.info(f'uporabnik updated: {uporabnik}')
                return Response("OK", 200)
            except SQLAlchemyError as e:
                db.session.rollback()  # Rollback in case of an error
            return Response("Database error, update failed", 500)
        except Exception as e:
            current_app.logger.error(str(e))
            return Response("Bad Request", 400)

    def put(self):
        data = request.get_json()
        current_timestamp = int(time.time())
        cena = data.get("cena")
        gorivo = data.get("gorivo")
        kilometri = data.get("kilometri")
        letnik = data.get("letnik")
        menjalnik = data.get("menjalnik")
        model = data.get("model")
        opis = data.get("opis")
        pogon4 = data.get("pogon4")
        vrata = data.get("vrata")
        znamka = data.get("znamka")
        idUporabnika = data.get("idUporabnika")
        
        idAvto = data.get("idAvto")

        # current_app.logger.info(f"avto updated: {idAvto}")
        avto = get_avto_by_id(idAvto)
        if not avto:
            current_app.logger.error(f"avto with ID {idAvto} not found")
            return Response("avto not found", 404)
        else:
            avto.letnik=letnik
            avto.cena=cena
            avto.opis=opis
            avto.pogon4=pogon4
            avto.datumObjave=current_timestamp
            avto.kilometri=kilometri
            avto.model_idModel=model
            avto.model_znamka_idZnamka=znamka
            avto.gorivo_idGorivo=gorivo
            avto.vrata_idVrata=vrata
            avto.menjalnik_idMenjalnik=menjalnik
            avto.uporabnik_idUporabnik=idUporabnika
            try:
                db.session.commit()
                # current_app.logger.info(f"uporabnik updated: {avto.to_dict()}")
                return Response("OK", 200)
            except SQLAlchemyError as e:
                db.session.rollback()  # Rollback in case of an error
                return Response("Database error, update failed", 500)

    def delete(self):
        data = request.get_json()

        idAvto = data.get("idAvto")
        # current_app.logger.info(f"avto: {idAvto}")
        avto = get_avto_by_id(idAvto)

        if not avto:
            current_app.logger.error(f"avto with ID {idAvto} not found")
            return Response("avto not found", 404)

        db.session.delete(avto)
        db.session.commit()

        return Response("OK", 200)

#class za branje vseh avtov
class Avti(Resource):
    @staticmethod
    def get():
        _upor = selectAllUporabnik()
        _avti = selectAllAvto()
        _modeli = selectAllModel()
        _znamke = selectAllZnamke()
        _goriva = selectAllGorivo()
        _menjalniki = selectAllMenjalnik()
        _vrata = selectAllVrata()
        upor = []
        avti = []
        modeli = []
        znamke = []
        goriva = []
        menjalniki = []
        vrata = []
        for el in _modeli:
            modeli.append(
                {
                    "value": el.idModel,
                    "label": el.ime,
                    "znamkaId": el.znamka_idZnamka,
                    "znamkaName": el.znamka.ime,
                }
            )
        for el in _znamke:
            znamke.append({"value": el.idZnamka, "label": el.ime})

        for el in _goriva:
            goriva.append({"value": el.idGorivo, "label": el.ime})

        for el in _menjalniki:
            menjalniki.append({"value": el.idMenjalnik, "label": el.vrsta})

        for el in _vrata:
            vrata.append({"value": el.idVrata, "label": el.kolicina})

        for el in _upor:
            upor.append(
                {
                    "idUporabnik": el.idUporabnik,
                    "upIme": el.ime,
                    "upPriimek": el.priimek,
                    "upAdmin": el.admin,
                    "upMail": el.email,
                }
            )

        znamke_dict = {obj["value"]: obj for obj in znamke}
        modeli_dict = {obj["value"]: obj for obj in modeli}
        goriva_dict = {obj["value"]: obj for obj in goriva}
        menjalniki_dict = {obj["value"]: obj for obj in menjalniki}
        vrata_dict = {obj["value"]: obj for obj in vrata}
        upor_dict = {obj["idUporabnik"]: obj for obj in upor}

        #združitev vseh podatkov o avtu
        for el in _avti:
            merged_obj = {**el.to_dict()}

            if el.model_znamka_idZnamka in znamke_dict:
                data = znamke_dict[el.model_znamka_idZnamka]
                merged_obj.update(
                    {"znamkaId": data["value"], "znamkaName": data["label"]}
                )

            if el.model_idModel in modeli_dict:
                data = modeli_dict[el.model_idModel]
                merged_obj.update(
                    {"modelId": data["value"], "modelName": data["label"]}
                )

            if el.gorivo_idGorivo in goriva_dict:
                data = goriva_dict[el.gorivo_idGorivo]
                merged_obj.update(
                    {"gorivoId": data["value"], "gorivoName": data["label"]}
                )

            if el.menjalnik_idMenjalnik in menjalniki_dict:
                data = menjalniki_dict[el.menjalnik_idMenjalnik]
                merged_obj.update(
                    {"menjalnikId": data["value"], "menjalnikName": data["label"]}
                )

            if el.vrata_idVrata in vrata_dict:
                data = vrata_dict[el.vrata_idVrata]
                merged_obj.update(
                    {"vrataId": data["value"], "vrataName": data["label"]}
                )

            if el.uporabnik_idUporabnik in upor_dict:
                data = upor_dict[el.uporabnik_idUporabnik]
                merged_obj.update(data)

            avti.append(merged_obj)

        response = {
            "modeli": modeli,
            "znamke": znamke,
            "goriva": goriva,
            "menjalniki": menjalniki,
            "vrata": vrata,
            "avti": avti,
        }
        return jsonify(response)

#class za pridobivanje vseh avtov in podatke za avtomobili, ki jih je ustvaril trenutni uporabnik
class MojiAvti(Resource):
    @staticmethod
    def get():
        parser = reqparse.RequestParser()
        parser.add_argument('idUporabnik', type=str,location="args")
        args = parser.parse_args()
        idUporabnik = args.get('idUporabnik')   
        _upor = selectAllUporabnik()
        _avti = get_avto_by_user(idUporabnik)
        _modeli = selectAllModel()
        _znamke = selectAllZnamke()
        _goriva = selectAllGorivo()
        _menjalniki = selectAllMenjalnik()
        _vrata = selectAllVrata()
        upor = []
        avti = []
        modeli = []
        znamke = []
        goriva = []
        menjalniki = []
        vrata = []
        for el in _modeli:
            modeli.append(
                {
                    "value": el.idModel,
                    "label": el.ime,
                    "znamkaId": el.znamka_idZnamka,
                    "znamkaName": el.znamka.ime,
                }
            )
        for el in _znamke:
            znamke.append({"value": el.idZnamka, "label": el.ime})

        for el in _goriva:
            goriva.append({"value": el.idGorivo, "label": el.ime})

        for el in _menjalniki:
            menjalniki.append({"value": el.idMenjalnik, "label": el.vrsta})

        for el in _vrata:
            vrata.append({"value": el.idVrata, "label": el.kolicina})

        for el in _upor:
            upor.append(
                {
                    "idUporabnik": el.idUporabnik,
                    "upIme": el.ime,
                    "upPriimek": el.priimek,
                    "upAdmin": el.admin,
                    "upMail": el.email,
                }
            )

        znamke_dict = {obj["value"]: obj for obj in znamke}
        modeli_dict = {obj["value"]: obj for obj in modeli}
        goriva_dict = {obj["value"]: obj for obj in goriva}
        menjalniki_dict = {obj["value"]: obj for obj in menjalniki}
        vrata_dict = {obj["value"]: obj for obj in vrata}
        upor_dict = {obj["idUporabnik"]: obj for obj in upor}

        #združitev vseh podatkov o avtu
        for el in _avti:
            merged_obj = {**el.to_dict()}

            if el.model_znamka_idZnamka in znamke_dict:
                data = znamke_dict[el.model_znamka_idZnamka]
                merged_obj.update(
                    {"znamkaId": data["value"], "znamkaName": data["label"]}
                )

            if el.model_idModel in modeli_dict:
                data = modeli_dict[el.model_idModel]
                merged_obj.update(
                    {"modelId": data["value"], "modelName": data["label"]}
                )

            if el.gorivo_idGorivo in goriva_dict:
                data = goriva_dict[el.gorivo_idGorivo]
                merged_obj.update(
                    {"gorivoId": data["value"], "gorivoName": data["label"]}
                )

            if el.menjalnik_idMenjalnik in menjalniki_dict:
                data = menjalniki_dict[el.menjalnik_idMenjalnik]
                merged_obj.update(
                    {"menjalnikId": data["value"], "menjalnikName": data["label"]}
                )

            if el.vrata_idVrata in vrata_dict:
                data = vrata_dict[el.vrata_idVrata]
                merged_obj.update(
                    {"vrataId": data["value"], "vrataName": data["label"]}
                )

            if el.uporabnik_idUporabnik in upor_dict:
                data = upor_dict[el.uporabnik_idUporabnik]
                merged_obj.update(data)

            avti.append(merged_obj)

        response = {
            "modeli": modeli,
            "znamke": znamke,
            "goriva": goriva,
            "menjalniki": menjalniki,
            "vrata": vrata,
            "avti": avti,
        }
        return jsonify(response)

#class za pridobiti posamezen avto za urejanje podatkov    
class GetAvto(Resource):
    @staticmethod
    def get():
        parser = reqparse.RequestParser()
        parser.add_argument('idAvto', type=str,location="args")
        args = parser.parse_args()
        idAvto = args.get('idAvto') 
        avto = get_avto_by_id(idAvto)
        if not avto:
            current_app.logger.error(f"avto with ID {idAvto} not found")
            return Response("avto not found", 404)
        else:
            response = {
                "avto": avto.to_dict(),
            }
            return jsonify(response)


api = Api(api_avti)
api.add_resource(Avto, "/avto")
api.add_resource(Avti, "/avti")
api.add_resource(MojiAvti, "/mojiAvti")
api.add_resource(GetAvto, "/getAvto")
