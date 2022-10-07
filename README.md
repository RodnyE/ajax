# Ajax
Clase para usar la API AJAX de manera fácil y rápida en el navegador.

## Ejemplo de su uso
```javascript
let ajax = new Ajax();

let url = "http://example.com/example";
let data = {
  name: "Keni",
  email: "keni@mail.com"
};

// POST 
ajax.post(url, data, function(res){
  
	if (res.status === 200) console.log(res.data);
	else alert("error:" + res.status);
	
};

```

En el caso de una petición GET, son los mismos argumentos pero exceptuando `data`:
```javascript
ajax.get(url, function(res){
  
	if (res.status === 200) console.log(res.data);
	else alert("error:" + res.status);
	
};
```

## Propiedades
### `ajax.isSupported`
`boolean`, indica si AJAX tiene o no soporte en ese navegador



## Métodos
### `ajax.get(url, callback)`
`void`, Emitir petición GET.

| Argumento | Tipo | Descripción |
|:---------:|:----:|:------------|
| `url` | `string` | Dirección URL a donde se emitirá la petición |
| `callback` | `function` | Función que será llamada cuando la petición finalice, ya sea exitosa o no. Tiene como argumento la instancia XMLHttpRequest creada en la petición |



### `ajax.post(url, data, callback)`
`void`, Emitir petición POST para enviar datos más grandes.

| Argumento | Tipo | Descripción |
|:---------:|:----:|:------------|
| `data` | `string`, `object`, `FormData` o `null` | Datos que serán enviados junto con la petición, pueden ser los datos de un formulario, texto plano o un objeto que será enviado como JSON |



### `ajax.createQuery(obj)`
`string`, Retorna el objeto convertido en una query-string

| Argumento | Tipo | Descripción |
|:---------:|:----:|:------------|
| `obj` | `object` | Objeto con las propiedades y valores a convertir |

```javascript
let query = ajax.createQuery({
  name: "Keny",
  email: "keni@mail.com"
});
// "name=Keny&email=keni%40mail.com"
```




### `ajax.parseQuery(query)`
`object`, Retorna la query-string convertida a objeto

| Argumento | Tipo | Descripción |
|:---------:|:----:|:------------|
| `query` | `string` | una query-string válida para convertir |

```javascript
let data = ajax.parseQuery("name=Keny&email=keni%40mail.com");
/*
  {
    name: "Keny",
    email: "keni@mail.com"
  }
*/
```
