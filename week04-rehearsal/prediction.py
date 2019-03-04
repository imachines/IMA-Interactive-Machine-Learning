import tensorflow as tf
from tensorflow import keras
import numpy as np
import os

import matplotlib.pyplot as plt
import matplotlib.image as mpimg

fashion_mnist = keras.datasets.fashion_mnist
# train data vs. validation/test data
(train_images,train_labels),(test_images,test_labels) = fashion_mnist.load_data()

# labels
class_names = ['T-shirt/top', 'Trouser', 'Pullover', 'Dress', 'Coat','Sandal', 'Shirt', 'Sneaker', 'Bag', 'Ankle boot']

# images
train_images = train_images/255.0
test_images = test_images/255.0

############################ model ############################
###############################################################
model = keras.models.load_model('fashion_mnist.h5')


######################### application #########################
###############################################################
predictions = model.predict(test_images)
random_image = np.random.randint(1,1000)
prediction = predictions[random_image]
# this is the 10 Probabilities for the first test image
print("10 Probabilities will be {}".format(prediction))
prediction_label = np.argmax(prediction)
prediction_classname = class_names[prediction_label]
print("The model says: I think the given image is {}".format(prediction_classname))

imgplot = plt.imshow(test_images[random_image])
plt.show()
