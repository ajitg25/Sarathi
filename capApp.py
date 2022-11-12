import cv2
import streamlit as st
import time
import requests
import io
from PIL import Image
import numpy as np
import pickle


st.title("Webcam Live Feed")
run = st.checkbox('Run')
capture = st.checkbox('Capture')

FRAME_WINDOW = st.image([])
camera = cv2.VideoCapture(0)


while run:
    _, frame = camera.read()
    try:
        frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        FRAME_WINDOW.image(frame)

        if(capture):
            # image_file = io.BytesIO()
            # image = Image.fromarray(frame)
            # image.save(image_file, format = 'PNG') 
            # image_file.seek(0)
            # picture = st.camera_input("Take a picture")

            # if picture:
            #     st.image(picture)
            st.write(frame)

            cv2.imshow("image",frame)
            cv2.imwrite("cur.jpg",frame)
            cv2.waitKey(0)
            break
    
    except Exception as e:
        pass

else:
    st.write('Stopped')