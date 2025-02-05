# Assignment: create an API file system

**Goals:**

- [x] accepts a *GET* request `/listall`. Which will list and show all the files listed in the directory
    - **Some Bugs:**
        - not putting `"/"` after the route while sending request for the directory *generates error*.

- [x] accept *GET* request `/createfile:filename/`. Which will create a file in with filename given in the params.
    - Still I need to add the features of actually passing some content to write to the file
    - It also *does not check if file exists, it overrides*

- [x] added *GET* request `/deletefile/:filename/` for deleting files and `/deletedir/:dirname/` for deleting folders
    - **Some Bugs**
        - If the folder has subfolders then, it throws an error and cannot delete the folders unless all the subfolders are deleted first!

- [x] added *GET* request `/readfile/:filename` for reading the content of the file in *UTF-8* encoding

