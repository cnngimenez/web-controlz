# Ver página en modo desarrollo:
Debería ser posible abrir `./www/index.html` con el explorador web directamente:

```shell
firefox ./www/index.html
```

Pero si hace falta iniciar un servidor Web de desarrollo, utilizar una de estas
opciones:

Usando PHP:

```shell
php -S 127.0.0.1:8001
firefox http://127.0.0.1:8001
```

Usando Python:

```shell
python -m http.server -p 8001
firefox http://127.0.0.1:8001
```
