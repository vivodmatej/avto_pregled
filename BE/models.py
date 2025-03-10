from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


class znamka(db.Model):
    idZnamka = db.Column(db.Integer, primary_key=True)
    ime = db.Column(db.String(256), nullable=False)

    def to_dict(self):
        return {
            "idZnamka": self.idZnamka,
            "ime": self.ime,
        }

    def __repr__(self):
        return f"<znamka {self.ime}>"


class menjalnik(db.Model):
    idMenjalnik = db.Column(db.Integer, primary_key=True)
    vrsta = db.Column(db.String(256), nullable=False)

    def to_dict(self):
        return {
            "idMenjalnik": self.idMenjalnik,
            "vrsta": self.vrsta,
        }

    def __repr__(self):
        return f"<menjalnik {self.vrsta}>"


class gorivo(db.Model):
    idGorivo = db.Column(db.Integer, primary_key=True)
    ime = db.Column(db.String(256), nullable=False)

    def to_dict(self):
        return {
            "idGorivo": self.idGorivo,
            "ime": self.ime,
        }

    def __repr__(self):
        return f"<gorivo {self.ime}>"


class vrata(db.Model):
    idVrata = db.Column(db.Integer, primary_key=True)
    kolicina = db.Column(db.Integer, nullable=False)

    def to_dict(self):
        return {
            "idVrata": self.idVrata,
            "kolicina": self.kolicina,
        }

    def __repr__(self):
        return f"<vrata {self.name}>"


class model(db.Model):
    idModel = db.Column(db.Integer, primary_key=True)
    ime = db.Column(db.String(256), nullable=False)
    znamka_idZnamka = db.Column(db.Integer, db.ForeignKey('znamka.idZnamka'), nullable=False)

    znamka = db.relationship('znamka', backref=db.backref('models_znamkas', lazy=True))
    
    def to_dict(self):
        return {
            "idModel": self.idModel,
            "ime": self.ime,
            "znamka_idZnamka": self.znamka_idZnamka,
        }

    def __repr__(self):
        return f"<model {self.ime}>"


class uporabnik(db.Model):
    idUporabnik = db.Column(db.Integer, primary_key=True)
    ime = db.Column(db.String(45), nullable=False)
    priimek = db.Column(db.String(45), nullable=False)
    admin = db.Column(db.Boolean, nullable=False)
    email = db.Column(db.String(45), nullable=False)

    def to_dict(self):
        return {
            "idUporabnik": self.idUporabnik,
            "ime": self.ime,
            "priimek": self.priimek,
            "admin": self.admin,
            "email": self.email,
        }

    def __repr__(self):
        return f"<uporabnik {self.ime}>"


class geslo(db.Model):
    idGeslo = db.Column(db.Integer, primary_key=True)
    geslo = db.Column(db.String(45), nullable=False)
    email = db.Column(db.String(45), nullable=False)
    uporabnik_idUporabnik = db.Column(db.Integer, db.ForeignKey('uporabnik.idUporabnik'), nullable=False)
    
    uporabnik = db.relationship('uporabnik', backref=db.backref('models', lazy=True))

    def to_dict(self):
        return {
            "idGeslo": self.idGeslo,
            "geslo": self.geslo,
            "email": self.email,
            "uporabnik_idUporabnik": self.uporabnik_idUporabnik,
        }

    def __repr__(self):
        return f"<geslo {self.email}>"


class avto(db.Model):
    idAvto = db.Column(db.Integer, primary_key=True)
    letnik = db.Column(db.Integer, nullable=False)
    cena = db.Column(db.Float, nullable=False)
    opis = db.Column(db.String(1000), nullable=False)
    pogon4 = db.Column(db.Boolean, nullable=False)
    datumObjave = db.Column(db.Integer, nullable=False)
    kilometri = db.Column(db.Integer, nullable=False)
    
    model_idModel = db.Column(db.Integer, db.ForeignKey('model.idModel'), nullable=False)
    model_znamka_idZnamka = db.Column(db.Integer, db.ForeignKey('znamka.idZnamka'), nullable=False)
    gorivo_idGorivo = db.Column(db.Integer, db.ForeignKey('gorivo.idGorivo'), nullable=False)
    vrata_idVrata = db.Column(db.Integer, db.ForeignKey('vrata.idVrata'), nullable=False)
    menjalnik_idMenjalnik = db.Column(db.Integer, db.ForeignKey('menjalnik.idMenjalnik'), nullable=False)
    uporabnik_idUporabnik = db.Column(db.Integer, db.ForeignKey('uporabnik.idUporabnik'), nullable=False)
    
    model = db.relationship('model', backref=db.backref('models', lazy=True))
    znamka = db.relationship('znamka', backref=db.backref('znamkas', lazy=True))
    menjalnik = db.relationship('menjalnik', backref=db.backref('menjalniks', lazy=True))
    gorivo = db.relationship('gorivo', backref=db.backref('gorivos', lazy=True))
    vrata = db.relationship('vrata', backref=db.backref('vratas', lazy=True))
    uporabnik = db.relationship('uporabnik', backref=db.backref('uporabniks', lazy=True))

    def to_dict(self):
        return {
            "idAvto": self.idAvto,
            "letnik": self.letnik,
            "cena": self.cena,
            "opis": self.opis,
            "pogon4": self.pogon4,
            "datumObjave": self.datumObjave,
            "kilometri": self.kilometri,
            "model_idModel": self.model_idModel,
            "model_znamka_idZnamka": self.model_znamka_idZnamka,
            "gorivo_idGorivo": self.gorivo_idGorivo,
            "vrata_idVrata": self.vrata_idVrata,
            "menjalnik_idMenjalnik": self.menjalnik_idMenjalnik,
            "uporabnik_idUporabnik": self.uporabnik_idUporabnik,           
        }

    def __repr__(self):
        return f"<avto {self.idAvto}>"
