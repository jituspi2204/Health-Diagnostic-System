import numpy as np
from flask import Flask,jsonify,request,render_template,send_from_directory,make_response
import pickle
from flask_cors import CORS, cross_origin
# from tensorflow import keras
import os
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '2'


app = Flask('Heart Disease')
CORS(app)
heart_model = pickle.load(open('heart_model.pkl','rb'))
# ckd_model = keras.models.load_model('ckd.model')
cancer_model = pickle.load(open('cancer.pkl' , 'rb'))
ckd_model = pickle.load(open('ckd.pkl' , 'rb'))

@app.route('/')
def home():
    return send_from_directory('build',"index.html")


@app.route('/static/<path:path>')
def staticpath(path):
    return send_from_directory('static',path)


@app.route('/predict/heart' ,methods=['POST'])
def heart():
    data = request.get_json(force=True)
    arrData = list(data.values())
    del arrData[-1]
    inputData = [np.array(arrData)]
    result = int(heart_model.predict(inputData)[0])
    return jsonify(result=result)

# @app.route('/predict/ckd' ,methods=['POST'])
# def kidney():
#     data = request.get_json(force=True)
#     arrData = list(data.values())
#     del arrData[-1]
#     print([arrData])
#     result = ckd_model.predict([arrData])
#     print(result[0][0])
#     return jsonify(result=float(result[0][0]))


@app.route('/predict/ckd' ,methods=['POST'])
def kidney():
    data = request.get_json(force=True)
    arrData = list(data.values())
    # arrData = [58.0 ,70.0 ,1.02 ,0.0 ,0.0 ,0.0 ,0.0 ,0.0 ,0.0 ,102.0 ,48.0 ,1.2 ,139.0 ,4.3 ,15.0 ,40 ,8100 ,4.9 ,0.0 ,0.0 ,0.0 ,1.0 ,0.0 ,0.0,0]
    del arrData[-1]
    result = ckd_model.predict([arrData])
    return jsonify(result=int(result[0]))

@app.route('/predict/cancer' ,methods=['POST'])
def cancer():
    data = request.get_json(force=True)
    arrData = list(data.values())
    del arrData[-1]
    result = cancer_model.predict([arrData])
    return jsonify(result=int(result[0]))


@app.route('/<path>')
def otherHomeRoute(path):
    return send_from_directory('build',"index.html")


if __name__ == '__main__':
    app.run(debug=True)
