import torch
import torch.nn as nn
import torch.nn.functional as f

import torchvision
import torchvision.transforms as transfroms

import os

from torchvision.models import resnet18


def model(path):
    model = torch.hub.load('pytorch/vision:v0.6.0','resnet18',pretrained=True)

    for parameter in model.parameters():
        parameter.requires_grid = True

    resnet18.fc = torch.nn.Linear(in_features=512, out_features=3)
    in_features = model.fc.in_features
    model.fc = nn.Linear(in_features, 2) # input img contain 512 numbers have two prob covid or normal

    model.load_state_dict(torch.load(path,map_location=torch.device('cpu')))
    model.eval()

    return model

def transform():
    return torchvision.transforms.Compose([
    torchvision.transforms.Resize(256),
    torchvision.transforms.CenterCrop(224),
    torchvision.transforms.ToTensor(),
    torchvision.transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])
])

def predict(net,transform,image):
    classes = ['Covid','Normal']
    input_tesor= transform(image).unsqueeze(0)
    print("input_tensor",input_tesor)
    output = f.softmax(net(input_tesor),dim=1)
    print("output",output)

    prob,prediction =torch.max(output,1)
    out_label = classes[prediction]
    print("probabiltiy",prob)
    return out_label , prob.item()*100