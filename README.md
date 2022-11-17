# temperature-humidity-monitoring-system
A highly distributed web application for measuring, storing and displaying values of temperature and relative humidity. Various tools and technologies used for creating this ayatem are as follows:
Hardware Tools - DHT11 Temperature and Relative Humidity module, Arduino UNO
Software Tools - React JS, Chart JS, Express JS, Node JS, MySQL, Arduino IDE (C/C++)
Current Date, Time and values of Temperature and Relative Humidity are displayed.
Two input fields take the start timestamp and end timestamp values and then that data is sent to the Express JS REST API to get the values of temperature and relative humidity in that interval so that this data can be plotted on the chart.
When no input is provided, then values of temperature and relative humidity of the most recent 15 seconds interval are plotted on the chart. 
