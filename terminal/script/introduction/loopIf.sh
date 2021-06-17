#!/bin/bash

count=0

for i in `ls $1` 
do
  count=$((count + 1))
done

if [ "$count" -eq 0 ]; then 
  echo "Nenhum arquivo encontrado"
elif [ "$count" -eq 1 ]; then
  echo "Apenas 1 arquivo foi encontrado"
else 
  echo "Foram encontrados $count arquivos"
fi