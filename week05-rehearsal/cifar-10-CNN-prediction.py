import warnings
with warnings.catch_warnings():
    warnings.filterwarnings("ignore",category=FutureWarning)
    import tensorflow as tf
    from tensorflow import keras
    import numpy as np
    from tensorflow.keras.preprocessing.text import Tokenizer

# import tensorflow as tf
# from tensorflow import keras
# import numpy as np
import os

import matplotlib.pyplot as plt
import matplotlib.image as mpimg

tf.logging.set_verbosity(tf.logging.ERROR)
tf.logging.set_verbosity(tf.logging.get_verbosity())


batch_size = 32
num_classes = 10
epochs = 50

# The data, split between train and test sets:
(x_train, y_train), (x_test, y_test) = keras.datasets.cifar10.load_data()
print('x_train shape:', x_train.shape)
print(x_train.shape[0], 'train samples')
print(x_test.shape[0], 'test samples')

# Convert class vectors to binary class matrices.
y_train = keras.utils.to_categorical(y_train, num_classes)
y_test = keras.utils.to_categorical(y_test, num_classes)

x_train = x_train.astype('float32')
x_test = x_test.astype('float32')
x_train /= 255
x_test /= 255

class_names = ['airplane','automobile','bird','cat','deer','dog','frog','horse','ship','truck']

############################ model ############################
###############################################################
# Load model and weights
model = keras.models.load_model('saved_models/keras_cifar10_trained_model.h5')

######################### application #########################
###############################################################
predictions = model.predict(x_test)
random_image = np.random.randint(1,100)
prediction = predictions[random_image]
# this is the 10 Probabilities for the first test image
print("{} Probabilities will be {}".format(num_classes, prediction))
prediction_label = np.argmax(prediction)
prediction_classname = class_names[prediction_label]
print("The model says: I think the given image is {}".format(prediction_classname))

imgplot = plt.imshow(x_test[random_image])
plt.show()
