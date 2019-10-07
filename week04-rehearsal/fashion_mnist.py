import tensorflow as tf
print(tf.__version__)
from tensorflow import keras
import numpy as np
import os

import matplotlib.pyplot as plt
import matplotlib.image as mpimg

# load the data
# fashion mnist is included in tf distribution:
fashion_mnist = keras.datasets.fashion_mnist
# train data vs. validation/test data
(train_images,train_labels),(test_images,test_labels) = fashion_mnist.load_data()

# see the size of the dataset
print(len(train_labels),train_labels.shape, train_labels[0])
print(len(train_images),train_images.shape)
# print(train_images[0])
print(np.array_str(train_images[0], max_line_width=200))

index = np.random.randint(1,60000)
plt.imsave('sample-{}.png'.format(index),train_images[index])
imgplot = plt.imshow(train_images[index])
plt.show()

# labels
class_names = ['T-shirt/top', 'Trouser', 'Pullover', 'Dress', 'Coat','Sandal', 'Shirt', 'Sneaker', 'Bag', 'Ankle boot']

print("the number {} image is {}".format(index,class_names[train_labels[index]]))

# images
train_images = train_images/255.0
test_images = test_images/255.0




############################ model ############################
#######################forward propagation#####################
model = keras.Sequential([
    keras.layers.Flatten(input_shape=(28,28)),
    # datashape: 1*784  m*n
    keras.layers.Dense(128,activation=tf.nn.relu),
    # datashape: 1*128
    # relu: f(x) = x (x>0) or f(x) = 0 (x<=0)
    # convert m*n with an operation: dot product (1*784)
    # with prameter n*l (784*128)
    # m*l (1*128)
    keras.layers.Dense(10,activation=tf.nn.softmax)
    # datashape: 1*10
])


############################ train ############################
######################backward propagation#####################

# define backward propagation parameters
model.compile(optimizer='adam',
            loss='sparse_categorical_crossentropy',
            metrics=['accuracy']
            )

# training parameters
model.fit(train_images,train_labels,epochs=5)


# evaluate the result
test_loss,test_acc = model.evaluate(test_images,test_labels)
print("Hey, this is how good the model performs {}".format(test_acc))

# model.save('fashion_mnist.h5') # file extension

######################### application #########################
###############################################################
predictions = model.predict(test_images)
random_image = np.random.randint(1,10000)
prediction = predictions[random_image]

# this is the 10 Probabilities for the first test image
print("10 Probabilities will be {}".format(prediction))
prediction_label = np.argmax(prediction)
prediction_classname = class_names[prediction_label]
print("The model says: I think the given image is {}".format(prediction_classname))

imgplot = plt.imshow(test_images[random_image])
plt.show()















#:)
