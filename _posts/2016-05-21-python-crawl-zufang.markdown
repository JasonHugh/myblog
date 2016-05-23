---
layout: post
title:  "python 爬虫抓取19楼租房信息"
date:   2016-05-21 17:51:00 +0800
categories: python爬虫
---
## 查看19lou.com的Cookie ##
chrome中打开19lou.com，按F12可以打开开发者工具查看

![这里写图片描述](http://img.blog.csdn.net/20160521164932189)

***不获取Cookie会导致爬取网站时重定向而抓不到内容***

## 定义headers ##

{% highlight python linenos %}
headers = {'User-Agent':'Mozilla/5.0 (Windows NT 6.1; WOW64; rv:14.0) Gecko/20100101 Firefox/14.0.1',
       'Referer':'http://www.19lou.com',
       'Cookie':"your cookie"}
{% endhighlight %}

## 请求页面 ##
我们请求的url为：[租房列表页](http://www.19lou.com/thread/category/structure/search/result?mf_1831_1=4&mf_1831_2=3&mf_55=2&mf_55_field=18&mf_low_65=2001&mf_high_65=2500&mf_68=0&mf_62=0&mf_Q=%E5%92%8C%E7%9D%A6%E6%96%B0%E6%9D%91&fid=1637&m=10001&page=1)  
***page=1为第一页***

{% highlight python linenos %}
try:
    request = urllib2.Request(url,headers=headers)
    response = urllib2.urlopen(request)
except:
    print 'server connect failed'
    raw_input('Press enter key to exit')
    exit()
{% endhighlight %}

## BeautifulSoup解析网页 ##

### 整个网页结构 ###

![这里写图片描述](http://img.blog.csdn.net/20160521170905526)

### 首先用开发者工具找出需要获取到的元素位置 ###

![这里写图片描述](http://img.blog.csdn.net/20160521170741618)

### 用BeautifulSoup解析 ###

{% highlight python linenos %}
html = response.read()
soup = BeautifulSoup(html,"html.parser",fromEncoding="gb18030")
for child in soup.table.find_all('a'):
    url = child.get('href')
{% endhighlight %}
***循环 `<a>` 标签获取所有子页面的url，然后请求详情页获取租房信息和图片***

## 详情页解析 ##

{% highlight python linenos %}
for child in soup.table.find_all('a'):
    url = child.get('href')
    try:
        request = urllib2.Request(url,headers=headers)
        response = urllib2.urlopen(request)
    except:
        print 'server conect failed'
        raw_input('Press enter key to exit')
        exit() 
{% endhighlight %}

### 通过开发者工具查看详情页结构，抓取相关信息 ###

{% highlight python linenos %}
html = response.read()
soup = BeautifulSoup(html,"html.parser",fromEncoding="gb18030")
ul = soup.find('ul',{'id':'slide-data'})
tr = soup.find('table',{'class':'view-table link0'}).find_all('tr')
hx = tr[2].td.get_text()  #获取 户型 信息
#循环获取房屋图片地址
for row in ul.find_all('li'):
    image = row.find('a',{'class':'J_login nail'}).img.get('src')
    image_big = row.find('p').img.get('src')
{% endhighlight %}

***以上为部分讲解，下面是代码链接***

 - [抓取到的信息](http://hayson.top/zufang.html)
 - [github完整代码](https://github.com/JasonHugh/py_crawler/blob/master/zufang.py)