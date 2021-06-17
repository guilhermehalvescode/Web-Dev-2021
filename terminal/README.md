# Linux Terminal

### Commands list
- Directory Commands
  - `pwd` -> shows current directory 
  - `cd [$path]`  -> (Change Directory) used to navigate through directories
  - `ls [$path]`  -> (List) list current directory contents
  - `mkdir [$dirName]` -> (Make Directory) creates a folder

- Console Commands
  - `clear` -> clear console contents 
  - `echo [$string]` -> prints string
    - `echo "Hello World" > output.txt` -> Redirects `echo` output to `output.txt` file

- File Management Commands
  - `cat [$file]` -> concatenates file contents to console
  - `gedit [$file]` -> opens text editor for a file
  - `cp [$src] [$dest]` -> copies src to dest
  - `mv [$src] [$dest]` -> command used to move/rename files
  - `rm [$file]` -> removes a file
    - `rm -rf` -> rf is a flag, r makes removal recursive(removes inner files), f makes removal forced(remove files ignoring restrictions)

- File Permission Commands
  - `chmod` -> change file permissions
    - `chmod 777 file.txt` -> give `file.txt` all permissions
    - ![chmod](./images/chmod.png)
  - `chown` ->