from flask import Flask, render_template, request
from PIL import Image

from mlengine import model,transform,predict

model_path = 'model/state_dict_model4.pt'

app=Flask(__name__)
model = model(model_path)
preprocess  = transform()

@app.route('/')
def home(self):
    return render_template('XRay.html')

@app.route('/upload' ,methods=['POST','GET'])
def upload():
    if request.method =='POST':
        img_file = request.files["image"]
        image=Image.open(img_file).convert('RGB')
        label , prob = predict(model, preprocess,image)
        return render_template('Result.html',label=label , prob=prob)
    else:
        return render_template('XRay.html')

if __name__ == '__main__':
    app.run(port=1111 , debug=True,threaded=True)
