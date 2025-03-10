from flask import Flask, Response
import logging
import os
from models import db
from dbApi import db_api
from userApi import api_users
from avtoApi import api_avti

fmt = "[%(asctime)s]|%(levelname)s|[%(module)s]:%(funcName)s()|%(message)s"
logging.basicConfig(format=fmt)
log = logging.getLogger()
log.setLevel(logging.DEBUG)

app = Flask(__name__)
app.config.update(SECRET_KEY=os.urandom(16))

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:admin@127.0.0.1:3306/avto'
db.init_app(app)

app.register_blueprint(db_api)
app.register_blueprint(api_users)
app.register_blueprint(api_avti)


@app.route('/', methods=['GET'])
def index():
    return Response("OK", 200)


if __name__ == "__main__":
    # db_init()
    app.run(debug=True)