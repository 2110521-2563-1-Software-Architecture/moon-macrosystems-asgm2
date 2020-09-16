# Assignment #2: gRPC and REST API Benchmarking

## Members
1. Naravich Chutisilp		    6030319921
2. Navabhorn Pandee 		    6030324021
3. Pornapat Sudjaipraparat 	6030394921
4. Ravipas Aphikulvanich	  6031050121

## 1. Graphs showing the benchmarking results with the explanation of your experimental settings.
### a. Single client with a small call to insert a book item, a bigger call to insert a list of multiple book items. 
![asmall](images/asmall.jpg)
![abig](images/abig.jpg)

ทั้ง small call และ bigger call จะเห็นได้ว่า gRPC จะเร็วกว่าอย่างเห็นได้ชัด
### b. Multiple clients with different kind of calls.
![b](images/b.jpg)

ให้ client แต่ละคนเรียกฟังก์ชั่นแบบสุ่ม โดยสองคนเรียกผ่าน REST API ส่วนอีกสองคนเรียกผ่าน gRPC
### c. Vary the number of concurrent calls from 1 to 4096 calls. 
![c](images/c.jpg)

ให้ client ส่ง request ไปเรื่อย ๆ เป็นจำนวน n = [1, 2, 4, 8, 16, 32, 64, 128, 256, 512, 1024, 2048, 4096] ครั้ง โดยที่ไม่ต้องรอตัวก่อนหน้าทำเสร็จ พร้อมวัด response time โดยจากกราฟด้านบนจะเห็นได้ว่า REST API จะเร็วกว่า gRPC

## 2. Discussion of the results why one method is better the other in which scenarios. 
From the result, gRPC has mostly better performance than REST API. The reasons why the gRPC has a faster response time are the protocol and transmission format. gRPC uses HTTP/2, which supports continuous transmitting packets, and also has Protobuf which transmits data in binary format. Whereas, REST API uses HTTP/1.1 and transmits the data in JSON format which bigger than Protobuf

## 3. Comparison of the gRPC and REST API from the aspects of language neutral, ease of use, and performance. 
| Functions  | gPRC | REST API | 
| ------------- | ------------- | ------------- | 
| Language Natural  | ค่อนข้างใหม่ คนไม่คุ้นเคยเท่าไหร่ | ใช้ JSON เป็นพื้นฐาน มีความยืดหยุ่นมากกว่า สามารถรองรับได้หลายภาษากว่า | 
| Ease of use  |เขียนโค้ดได้สั้นกว่า | ใช้กันอย่างแพร่หลาย แต่ต้องเขียนโค้ดยาวกว่า debug โดยตรงก็ยากกว่า |
| Performance | จากผลการทดลองคือส่วนใหญ่ performance จะดีกว่า |  ช้ากว่า | 

## 4. Does your results comply with the results in https://medium.com/@bimeshde/grpc-vs-rest-performance-simplifiedfd35d01bbd4? How?
จากการอ่านบทความแล้วนั้น กลุ่มของพวกเราได้ผลลัพธ์ส่วนใหญ่ไปในทิศทางเดียวกันกับในบทความ ทั้งในเรื่อง performance ที่ gRPC จะมี response time ที่น้อยกว่า และมี ease of use ที่มากกว่า
