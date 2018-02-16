cd "bitmap"
gm convert %1.jpg -colorspace CMYK %1-cmyk.jpg
gm convert %1-cmyk.jpg -operator All negate 1 %1-cmyk.jpg

gm convert %1-cmyk.jpg -channel Cyan %1-cyan.png
gm convert %1-cmyk.jpg -channel Yellow %1-yellow.png
gm convert %1-cmyk.jpg -channel Magenta %1-magenta.png
gm convert %1-cmyk.jpg -channel Black %1-key.png
gm convert %1-key.png -operator All negate 1 %1-key.png

cd ..