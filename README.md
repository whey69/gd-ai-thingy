# gd-ai-thingy
code i used to make the yourtetaq/yourthetaq accounts in gd

also the code isnt very tested so be aware of that

## setup/usage
the tutorial requires some basic knowledge but i think you can do it
#### step 1. 
run `git clone https://github.com/whey69/gd-ai-thingy.git` in a folder, it should create a folder with the tools needed in it

or just download the repository as zip and unpack it wherever you want

#### step 2.
open `text_generation.ipynb` with either google colab or vs code (i recommend the former)

run everything, if needed follow instructions in the notebook

#### step 3.
once you have the model unzip it into a folder (with the same name) in the directory with the repository

it should look something like this:
```
./
  /one_step/
    ... (files in the one_step)
  /gen.py
  /config.json
  ... (other files)
```

#### step 4.
were almost there, before running the ai we need to create a config

open config.json in a prefered text editor and change the values as needed
options: 
```
saveToFile: whether to save the output to a file, or send to gd servers. (default: false)
waitTime:   how much to wait after sending the comment, ignored if saveToFile is true (default: 181)
(the next options are not required if saveToFile is set to true)
gdAccountId: AccountId of the account which will post the comments, you can get it on gdbrowser.com
gdAccountName: username of the account
gdAccountPassword: password of the account, dont worry its not getting send anywhere (except robtops servers)
```

#### step 5.
the last step is to install python and/or tensorflow

open up command terminal and run `python -m pip install tensorflow`

(if you can do it in a conda environment but not required)

once the command is done you can run gen.py and the ai should work.
