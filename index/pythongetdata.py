
import pandas as pd
import matplotlib.pyplot as plot
import numpy as np
from sklearn.linear_model import LinearRegression
#df=pd.read_csv('calendar.csv')
#df2=pd.read_csv('listings.csv')
df3=pd.read_csv('listings_s.csv')

def get_linear_xandy(df3):
    tempdf=df3.copy()
    tempdf.drop(tempdf[tempdf['price']>100].index,inplace=True)
    tempdf.drop(tempdf[tempdf['minimum_nights']>500].index,inplace=True)
    tempdf.drop(tempdf[tempdf['minimum_nights']<10].index,inplace=True)
    tempdf=tempdf.sort_values('price',ascending=False)
    x=tempdf['price']
    y=tempdf['minimum_nights']
    model=LinearRegression()
    model.fit(np.array(x).reshape(-1,1),y)
    test_y=[i*model.coef_[0]+model.intercept_ for i in x]
    return [x,y,test_y]

data=get_linear_xandy(df3)

np_data = np.array(data)
##写入文件
pd_data = pd.DataFrame(np_data.T,columns=['y','x',"xtest"])
print(pd_data)
pd_data.to_csv('pythondata.csv')
