---
layout: post
title: "Working with Lua and LevelDB"
author: Marco Pompili
date: 2014-10-04 15:07:05 +0200
categories: linux lua leveldb
repo: lua-leveldb
---

During my job for *Big Company* (*BC*) they asked me to analyze HTTP (clear) traffic and then to reproduce the captured traffic for testing purposes.

I had a VPS at my disposal with Ubuntu. The best way to analize traffic on the top of my mind is [Wireshark](//www.wireshark.org/). Wireshark is a protocol analyzing software with [lua](//www.lua.org/) embedded in it, lua can be used as a scripting language to make Wireshark do whatever I needed. <!--more--> Wireshark is an established OSS project for well over a decade, called Ethereal before changing name to Wireshark. Wireshark embeds Lua, but C can be used also to achieve more efficient parsing, obviously writing an extension in C is more time consuming than Lua, but Lua can be pretty fast too. Using anything else than this it seemed preposterous to me.

<!--more-->

I don't want to get into details of my Lua extension for Wireshark. The supposed problem was that it was _too much of a leap_ for rest of the tecnologies used in *BC* and it got trashed, but in my spare time I also wrote another extension for Lua called **lua-leveldb** that I would have used on that project before it got cancelled.

Lua-leveldb is a set of bindings for lua to use a no-sql library called [LevelDB](//github.com/google/leveldb) written by some clever folks at Google. LevelDB was intended for mobile systems but in my case I thought it was a good choice since I needed to create multiple db files (one for every open connection by an user).

This extension is now on GitHub, and I worked on it a little more.

Check it out its [repository](//github.com/marcopompili/lua-leveldb).

# A basic example

Here some examples that can be also find inside the repository (basic.lua):

```lua
leveldb = require 'lualeveldb'

opt = leveldb.options()
opt.createIfMissing = true
opt.errorIfExists = false

local db_file = 'basic.db'
local test_key = 'key1'
local test_val = 'val1'

print ('opening ' .. db_file .. '...')
local db = leveldb.open(opt, db_file)

if leveldb.check(db)
then
    if db:put(test_key, test_val)
    then
        print ('key1: '.. db:get(test_key))
    end
end

leveldb.close(db)

db = leveldb.open(opt, db_file)
db:put('key2', '123456')

print ('key2: ' .. db:get('key2'))

leveldb.close(db)
```

## Step by step

After including the library on a global variable on the first line, I do some initialization. On the first line I create the options and set to flags that LevelDB will use on file creation:

```lua
leveldb = require 'lualeveldb'

opt = leveldb.options()
opt.createIfMissing = true
opt.errorIfExists = false
```

Two local variables for keeping a *test key* and a *test value* and with the call `leveldb.open` I create or open an existing LevelDB database called `basic.db`:

```lua
local test_key = 'key1'
local test_val = 'val1'

print ('opening ' .. db_file .. '...')
local db = leveldb.open(opt, db_file)
```

`leveldb.check` if `testdb` was created succesfully (convenience method for a `nil` check) the with `testdb:put` I can insert `test_val` in the `test_key` entry,
then I close the db handler with `leveldb.close`:

```lua
if leveldb.check(db)
then
    if db:put(test_key, test_val)
    then
        print ('key1: '.. db:get(test_key))
    end
end

leveldb.close(db)
```

Let's open the `basic.db` again using the same local variable for the handler, `put` another key/value and `get` **key2** as a test:

```lua
db = leveldb.open(opt, db_file)
db:put('key2', '123456')

print ('key2: ' .. db:get('key2'))

leveldb.close(db)
```

And this concludes a simple put/get operation on a leveldb database, the output would be:

```console
opening basic.db...
key1: val1
key2: 123456
```