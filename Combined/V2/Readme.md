# Programming/Frontend tools used
#### 35% : D3 for drawing various components (D3.js is a popular JavaScript library)
#### 15% : Vue for various components, including drop down menus and linkage (Vue.js is a JavaScript framework)
#### 20% : JavaScript, HTML, CSS (are main web development tools)
#### 25% : Python 3, MS Excel for data processing
#### 5% : Github for data hosting
#### MS Visual Studio for code editing

# Update on 20th Jan 2020

# Combined - Bar chart + Draggable circles + Word Cloud + Heatmap

## Check out this link for the live demo
## https://ayushgupta51379.github.io/Visualizing_Kaggle_2020_Data_Science_Survey/Combined/V2/combine_new.html

#### Screenshots:
![Image](https://github.com/AyushGupta51379/Visualizing_Kaggle_2020_Data_Science_Survey/blob/main/Combined/V2/Screenshots/Screenshot_001.PNG)
![Image](https://github.com/AyushGupta51379/Visualizing_Kaggle_2020_Data_Science_Survey/blob/main/Combined/V2/Screenshots/Screenshot_002.PNG)
![Image](https://github.com/AyushGupta51379/Visualizing_Kaggle_2020_Data_Science_Survey/blob/main/Combined/V2/Screenshots/Screenshot_003.PNG)

#### Explaination

##### Bar chart
The bar chart denotes annual compensation reported by the users of Kaggle. It represents the number of respondents getting annual compensation in a range, from the current x value to the next x value. Note that a significant number of users were students, and probably reported 0 for the compensation, thus the huge bar for 0. 

It can be filtered according to the country, either through drop down menu or by hovering over a circle in the circle graph. Initially, the bar chart represents all countries together.

##### Draggable circles graph
The circles graph represents the countries and number of respondents from each country (through the size and color encoding of the circles). You can hover over them which would show the bar chart of the corresponding country. The circles can also be dragged for fun.

##### Word Cloud graph
The word cloud represents the popularity of the tools used by the respondents of survey. You can select different tools such as IDE notebooks, Programming languages, Cloud computing platforms and more, to see their popularity. With the size and color encoding the popularity.

#### Heatmap
The heatmap represents the job titles, programming experience in years, and the corresponding number of respondents for them. The color encodes the number of respondents, darker color denotes more respondents, whereas lighter color denotes less respondents.
