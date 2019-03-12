Usage of optimizers (keras avaliable ones):
* keras.optimizers.xx

* Stochastic gradient descent optimizer
  * the famous SGD
  * keras.optimizers.SGD(lr=0.01, momentum=0.0, decay=0.0, nesterov=False)

* RMSProp optimizer
  * good for RNN
  * keras.optimizers.RMSprop(lr=0.001, rho=0.9, epsilon=None, decay=0.0)
  * recommend to keep the defaults


* Adagrad optimizer
  * with parameter-specific learning rates, which are adapted relative to how frequently a parameter gets updated during training. if a parameter updates more, the smaller the lr will be.
  * keras.optimizers.Adagrad(lr=0.01, epsilon=None, decay=0.0)
  * recommend to keep the defaults

* Adadelta optimizer
  * a more robust version of Adagrad that adapts learning rates based on [**a moving window**]() of gradient updates
  * keras.optimizers.Adadelta(lr=1.0, rho=0.95, epsilon=None, decay=0.0)
  * recommend to keep the defaults

* Adam related ones from this [paper](https://arxiv.org/abs/1412.6980v8)

  * Adam optimizer
    * adapted from paper with original parameters
    * keras.optimizers.Adam(lr=0.001, beta_1=0.9, beta_2=0.999, epsilon=None, decay=0.0, amsgrad=False)

  * Adamax optimizer
    * adapted from section 7 in paper
    * keras.optimizers.Adamax(lr=0.002, beta_1=0.9, beta_2=0.999, epsilon=None, decay=0.0)

  * Nesterov Adam optimizer
    * Adam RMSprop with Nesterov momentum
    * keras.optimizers.Nadam(lr=0.002, beta_1=0.9, beta_2=0.999, epsilon=None, schedule_decay=0.004)
    * recommend to keep the defaults
