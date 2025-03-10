from models import znamka, menjalnik, gorivo, vrata, model, uporabnik, geslo, avto
from flask import current_app

#pridobitev vseh znamk   
def selectAllZnamke():
    try:
        return znamka.query.all()
    except Exception as e:
        current_app.logger.error(str(e))
        raise

#pridobitev posamezne znamke
def get_znamka_by_id(id):
    """Fetch a single user by ID."""
    return znamka.query.filter_by(idZnamka=id).first()


#pridobitev vseh menjalnikov 
def selectAllMenjalnik():
    try:
        return menjalnik.query.all()
    except Exception as e:
        current_app.logger.error(str(e))
        raise

#pridobitev posameznega menjalnika
def get_menjalnik_by_id(id):
    """Fetch a single user by ID."""
    return menjalnik.query.filter_by(idMenjalnik=id).first()


#pridobitev vseh goriv 
def selectAllGorivo():
    try:
        return gorivo.query.all()
    except Exception as e:
        current_app.logger.error(str(e))
        raise

#pridobitev posameznega goriva
def get_gorivo_by_id(id):
    """Fetch a single user by ID."""
    return gorivo.query.filter_by(idGorivo=id).first()


#pridobitev vseh vrat 
def selectAllVrata():
    try:
        return vrata.query.all()
    except Exception as e:
        current_app.logger.error(str(e))
        raise

#pridobitev posameznih vrat
def get_vrata_by_id(id):
    """Fetch a single user by ID."""
    return vrata.query.filter_by(idVrata=id).first()


#pridobitev vseh modelov 
def selectAllModel():
    try:
        models = model.query.join(znamka, model.znamka_idZnamka == znamka.idZnamka).all()
        return models
    except Exception as e:
        current_app.logger.error(str(e))
        raise

#pridobitev modela avta    
def get_model_by_id(id):
    """Fetch a single user by ID."""
    return model.query.filter_by(idModel=id).first()

#pridobitev modelov po znamki
def get_model_by_znamka(id):
    """Fetch a single user by ID."""
    return model.query.filter_by(znamka_idZnamka=id).all()


#pridobitev vseh uporabnikov 
def selectAllUporabnik():
    try:
        return uporabnik.query.all()
    except Exception as e:
        current_app.logger.error(str(e))
        raise

#pridobitev posameznega uporabnika
def get_uporabnik_by_id(id):
    """Fetch a single user by ID."""
    return uporabnik.query.filter_by(idUporabnik=id).first()

#pridobitev uporabnika po emailu
def get_uporabnik_by_email(email):
    """Fetch a single user by ID."""
    return uporabnik.query.filter_by(email=email).first()



#pridobitev podatkov za gesla
def get_uporabnik_by_geslo(id, password):
    """Fetch a single user by ID."""
    return geslo.query.filter_by(email=id, geslo=password).first()
#pridobitev gesla po emailu
def get_geslo_by_email(email):
    """Fetch a single user by ID."""
    return geslo.query.filter_by(email=email).first()
#pridobitev gesla po uporabniku
def get_geslo_by_uporabnik(id):
    """Fetch a single user by ID."""
    return geslo.query.filter_by(uporabnik_idUporabnik=id).first()



#pridobitev vseh avtov 
def selectAllAvto():
    try:
        return avto.query.all()
    except Exception as e:
        current_app.logger.error(str(e))
        raise

#pridobitev posameznega avta
def get_avto_by_id(id):
    """Fetch a single user by ID."""
    return avto.query.filter_by(idAvto=id).first()

#pridobitev vseh avtov od uporabnikov
def get_avto_by_user(id):
    """Fetch a single user by ID."""
    return avto.query.filter_by(uporabnik_idUporabnik=id).all()

