file2base64
-----

file2base64 is a react component solution for file or image upload,and convert upload image into base64.


Usage
-----

### import file

```
import FileHandle from "file";
<input type="file" onChange={this.changeHandler.bind(this)} />
```


### upload event


```
changeHandler(event){        
    let file = event.target.files[0];  
    
    FileHandle.file2base64(file, (base64) => {
		//base64 is return.
		//eg:data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4z
	})

}
```

### ios problem solution

if you meet the problem that you take photo and image orientation is wrong，you can import exif.js.
引入exif，详见  http://code.ciaoca.com/javascript/exif-js/

```
<script type="text/javascript" src="exif.js" ></script>
```

