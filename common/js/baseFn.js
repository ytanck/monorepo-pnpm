
// var Base64 = require('js-base64').Base64;
// import Base64 from 'js-base64';

const ua = navigator.userAgent

var baseFn = {
  fn:(a)=>{
    console.log(a);
    return a*10
  },
  // 字符串合法验证
  verify: {
    ID(card) {
      card = card.toUpperCase();
      var vcity = {
        11: "北京",
        12: "天津",
        13: "河北",
        14: "山西",
        15: "内蒙古",
        21: "辽宁",
        22: "吉林",
        23: "黑龙江",
        31: "上海",
        32: "江苏",
        33: "浙江",
        34: "安徽",
        35: "福建",
        36: "江西",
        37: "山东",
        41: "河南",
        42: "湖北",
        43: "湖南",
        44: "广东",
        45: "广西",
        46: "海南",
        50: "重庆",
        51: "四川",
        52: "贵州",
        53: "云南",
        54: "西藏",
        61: "陕西",
        62: "甘肃",
        63: "青海",
        64: "宁夏",
        65: "新疆",
        71: "台湾",
        81: "香港",
        82: "澳门",
        91: "国外"
      };
      //检查号码是否符合规范，包括长度，类型
      var isCardNo = function (card) {
        //身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X
        var reg = /(^\d{15}$)|(^\d{17}(\d|X)$)/;
        if (reg.test(card) === false) {
          return false;
        }
        return true;
      };
      //取身份证前两位,校验省份
      var checkProvince = function (card) {
        var province = card.substr(0, 2);
        if (vcity[province] == undefined) {
          return false;
        }
        return true;
      };
      //检查生日是否正确
      var checkBirthday = function (card) {
        var len = card.length;
        //身份证15位时，次序为省（3位）市（3位）年（2位）月（2位）日（2位）校验位（3位），皆为数字
        if (len == '15') {
          var re_fifteen = /^(\d{6})(\d{2})(\d{2})(\d{2})(\d{3})$/;
          var arr_data = card.match(re_fifteen);
          var year = arr_data[2];
          var month = arr_data[3];
          var day = arr_data[4];
          var birthday = new Date('19' + year + '/' + month + '/' + day);
          return verifyBirthday('19' + year, month, day, birthday);
        }
        //身份证18位时，次序为省（3位）市（3位）年（4位）月（2位）日（2位）校验位（4位），校验位末尾可能为X
        if (len == '18') {
          var re_eighteen = /^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/;
          var arr_data = card.match(re_eighteen);
          var year = arr_data[2];
          var month = arr_data[3];
          var day = arr_data[4];
          var birthday = new Date(year + '/' + month + '/' + day);
          return verifyBirthday(year, month, day, birthday);
        }
        return false;
      };
      //校验日期
      var verifyBirthday = function (year, month, day, birthday) {
        var now = new Date();
        var now_year = now.getFullYear();
        //年月日是否合理
        if (birthday.getFullYear() == year && (birthday.getMonth() + 1) == month && birthday.getDate() == day) {
          //判断年份的范围（3岁到100岁之间)
          var time = now_year - year;
          if (time >= 3 && time <= 100) {
            return true;
          }
          return false;
        }
        return false;
      };
      //校验位的检测
      var checkParity = function (card) {
        //15位转18位
        card = changeFivteenToEighteen(card);
        var len = card.length;
        if (len == '18') {
          var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
          var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');
          var cardTemp = 0,
            i, valnum;
          for (i = 0; i < 17; i++) {
            cardTemp += card.substr(i, 1) * arrInt[i];
          }
          valnum = arrCh[cardTemp % 11];
          if (valnum == card.substr(17, 1)) {
            return true;
          }
          return false;
        }
        return false;
      };
      //15位转18位身份证号
      var changeFivteenToEighteen = function (card) {
        if (card.length == '15') {
          var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
          var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');
          var cardTemp = 0,
            i;
          card = card.substr(0, 6) + '19' + card.substr(6, card.length - 6);
          for (i = 0; i < 17; i++) {
            cardTemp += card.substr(i, 1) * arrInt[i];
          }
          card += arrCh[cardTemp % 11];
          return card;
        }
        return card;
      };

      //是否为空
      if (card === '') {
        // 请输入身份证号，身份证号不能为空
        console.log('不能为空')
        return false;
      }
      //校验长度，类型
      if (isCardNo(card) === false) {
        // 您输入的身份证号码不正确，请重新输入
        console.log('检查长度、类型不通过')
        return false;
      }
      //检查省份
      if (checkProvince(card) === false) {
        console.log('检查省份不通过')

        // 您输入的身份证号码不正确,请重新输入
        return false;
      }
      //校验生日
      if (checkBirthday(card) === false) {
        console.log('检查生日不通过')

        // 您输入的身份证号码生日不正确,请重新输入
        return false;
      }
      //检验位的检测
      if (checkParity(card) === false) {
        console.log('检验位检测不通过')
        // 您的身份证校验位不正确,请重新输入
        return false;
      }
      return true;
    },
    checkChinese(val) {
      var reg = new RegExp("[\\u4E00-\\u9FFF]+", "g");
      if (reg.test(val)) {
        return true
      }
      return false
    },
    phoneNumber(val) {
      let myreg = /^[1][3-9][0-9]{9}$/;
      if (!myreg.test(val)) {
        return false
      }
      return true;
    },
    isChineseName(name) { //把名字中的分隔符（·）去掉，再判断是否全为中文，且长度在范围为2-15
      var nameWithoutDot = name.replace(/\u00b7/g, '');
      if (/^[\u4e00-\u9fa5]{1,15}$/i.test(nameWithoutDot)) {
        return true;
      } else {
        return false;
      }
    }
  },
  setTitle(){
    const title = decodeURIComponent(decodeURIComponent(text || ''))
  document.title = title

  try {
    // 判断ua环境
    const ua = navigator.userAgent.toLowerCase();
  
    if (AlipayJSBridge) {
      AlipayJSBridge.call('setTitle', {
        title,
      })
    } else if (ua.indexOf('iphone') > -1 && ua.indexOf('micromessenger') > -1) {
      setTimeout(() => {
        document.title = '哈哈哈哈';
        const iframe = document.createElement('iframe');
        iframe.style.visibility = 'hidden';
        iframe.style.width = '1px';
        iframe.style.height = '1px';
        iframe.src = '/favicon.ico'; // 这里
        iframe.onload = () => {
          setTimeout(() => {
            document.body.removeChild(iframe);
          }, 0);
        };
        document.body.appendChild(iframe);
      }, 0);
    }
  } catch (err) {
    console.log(err)
  }
  },
  // 获取随机电话
  getRandomPhoneNumber() {
    let _phoneNumberHead = ['3', '5', '6', '8'];
    return '1' + _phoneNumberHead[Math.floor(Math.random() * 3)] + Math.floor(Math.random() * 9) + '****' + Math.floor(Math.random() * 9000 + 1000)
  },

  // 获取随机姓名
  getRandomUserFirstName() {
    let firstName = ['赵', '钱', '孙', '李', '周', '吴', '王', '陈', '何', '张', '林', '郑', '韩', '冯', '杨'];
    return firstName[Math.floor(Math.random() * firstName.length)];
  },

  // 获取随机地区
  getRandomArea(accurateArea = '') {
    let accurateAreaObj = {
      "河北": ["石家庄", "保定", "秦皇岛", "唐山", "邯郸", "邢台", "沧州", "承德", "廊坊", "衡水", "张家口"],
      "山西": ["太原", "大同", "阳泉", "长治", "临汾", "晋中", "运城", "晋城", "忻州", "朔州", "吕梁"],
      "内蒙古": ["呼和浩特", "呼伦贝尔", "包头", "赤峰", "乌海", "通辽", "鄂尔多斯", "乌兰察布", "巴彦淖尔"],
      "辽宁": ["盘锦", "鞍山", "抚顺", "本溪", "铁岭", "锦州", "丹东", "辽阳", "葫芦岛", "阜新", "朝阳", "营口"],
      "吉林": ["吉林", "通化", "白城", "四平", "辽源", "松原", "白山"],
      "黑龙江": ["伊春", "牡丹江", "大庆", "鸡西", "鹤岗", "绥化", "双鸭山", "七台河", "佳木斯", "黑河", "齐齐哈尔"],
      "江苏": ["无锡", "常州", "扬州", "徐州", "苏州", "连云港", "盐城", "淮安", "宿迁", "镇江", "南通", "泰州"],
      "浙江": ["绍兴", "温州", "湖州", "嘉兴", "台州", "金华", "舟山", "衢州", "丽水"],
      "安徽": ["合肥", "芜湖", "亳州", "马鞍山", "池州", "淮南", "淮北", "蚌埠", "巢湖", "安庆", "宿州", "宣城", "滁州", "黄山", "六安", "阜阳", "铜陵"],
      "福建": ["福州", "泉州", "漳州", "南平", "三明", "龙岩", "莆田", "宁德"],
      "江西": ["南昌", "赣州", "景德镇", "九江", "萍乡", "新余", "抚州", "宜春", "上饶", "鹰潭", "吉安"],
      "山东": ["潍坊", "淄博", "威海", "枣庄", "泰安", "临沂", "东营", "济宁", "烟台", "菏泽", "日照", "德州", "聊城", "滨州", "莱芜"],
      "河南": ["郑州", "洛阳", "焦作", "商丘", "信阳", "新乡", "安阳", "开封", "漯河", "南阳", "鹤壁", "平顶山", "濮阳", "许昌", "周口", "三门峡", "驻马店"],
      "湖北": ["荆门", "咸宁", "襄樊", "荆州", "黄石", "宜昌", "随州", "鄂州", "孝感", "黄冈", "十堰"],
      "湖南": ["长沙", "郴州", "娄底", "衡阳", "株洲", "湘潭", "岳阳", "常德", "邵阳", "益阳", "永州", "张家界", "怀化"],
      "广东": ["江门", "佛山", "汕头", "湛江", "韶关", "中山", "珠海", "茂名", "肇庆", "阳江", "惠州", "潮州", "揭阳", "清远", "河源", "东莞", "汕尾", "云浮"],
      "广西": ["南宁", "贺州", "柳州", "桂林", "梧州", "北海", "玉林", "钦州", "百色", "防城港", "贵港", "河池", "崇左", "来宾"],
      "海南": ["海口", "三亚"],
      "四川": ["乐山", "雅安", "广安", "南充", "自贡", "泸州", "内江", "宜宾", "广元", "达州", "资阳", "绵阳", "眉山", "巴中", "攀枝花", "遂宁", "德阳"],
      "贵州": ["贵阳", "安顺", "遵义", "六盘水"],
      "云南": ["昆明", "玉溪", "大理", "曲靖", "昭通", "保山", "丽江", "临沧"],
      "西藏": ["拉萨", "阿里", "山南", "林芝", "日喀则", "昌都", "那曲"],
      "陕西": ["咸阳", "榆林", "宝鸡", "铜川", "渭南", "汉中", "安康", "商洛", "延安"],
      "甘肃": ["兰州", "白银", "武威", "金昌", "平凉", "张掖", "嘉峪关", "酒泉", "庆阳", "定西", "陇南", "天水"],
      "青海": ["西宁", "海西", "海东", "海北", "果洛州", "玉树", "黄南"],
      "宁夏": ["银川", "固原", "青铜峡", "石嘴山", "中卫"],
      "新疆": ["乌鲁木齐", "克拉玛依", "伊犁", "昌吉", "石河子", "哈密", "阿克苏", "巴音郭楞", "喀什", "塔城", "和田", "阿勒泰", "吐鲁番", "阿拉尔市", "博尔塔拉", "五家渠", "克孜勒苏", "图木舒克"],
      "北京": [],
      "上海": [],
      "重庆": [],
      "天津": [],
      "香港": [],
      "澳门": []
    };
    let area;
    if (accurateArea && accurateAreaObj[accurateArea]) {
      area = accurateAreaObj[accurateArea]
      if (area.length == 0) {
        return accurateArea;
      }
      return accurateArea + area[Math.floor(Math.random() * area.length)];

    } else {
      area = ['上海', '浙江杭州', '安徽合肥', '哈尔滨', '湖南长沙', '湖北武汉', '广东深圳', '北京', '四川成都', '天津', '河南郑州', '重庆', '福建厦门', '浙江宁波', '山东青岛', '河北唐山', '江苏苏州']
      return area[Math.floor(Math.random() * area.length)];
    }
  },
  // 获取产生startNumber至endNumber随机数,排除exceptNumber
  selectRandomNum(startNumber, endNumber, exceptNumber) {
    if (startNumber < 0 || endNumber <= 0 || startNumber >= endNumber || exceptNumber < 0 || exceptNumber < startNumber || exceptNumber > endNumber) {
      return
    }
    const choice = endNumber - startNumber + 1;
    let num = Math.floor(Math.random() * choice + startNumber)
    if (!exceptNumber && exceptNumber != 0) { // 真为空，非0
      return num
    } else { // 0 或者 其他
      if (exceptNumber == num) {
        return this.selectRandomNum(startNumber, endNumber, exceptNumber)
      } else {
        return num
      }
    }
  },


  // 获取随机用户组
  creatCustomerArr(n, accurateArea = '') {
    let customerArr = [];
    for (let i = 0; i < n; i++) {
      customerArr.push({
        name: this.getRandomUserFirstName() + this.getRandomGender(),
        phoneNumber: this.getRandomPhoneNumber(),
        area: this.getRandomArea(accurateArea)
      })
    }
    return customerArr
  },
  // 随机时间
  getRandomTimer() {
    let gender = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];
    return gender[Math.floor(Math.random() * gender.length)];
  },
  // 随机奖品
  getRandomGift(){
    let gender = ['领取华为P50手机一台','领取话费红包200元','领取蓝牙耳机一个','领取话费红包100元','领取幸运福袋一个','领取话费红包50元'];
    return gender[Math.floor(Math.random() * gender.length)];
  },
  // 随机头像
  getRandomIcon(i){
    if(i>13) i = i%14
    return `https://dsp-cdn.19ego.cn/redbag/userIcon/headIcon${i+1}.png`;
  },
  // 获取随机用户组 红包活动
  creatCustomerList(n) {
    let customerArr = [];
    for (let i = 0; i < n; i++) {
      customerArr.push({
        name: this.getRandomUserFirstName() + this.getRandomGender(),
        // phoneNumber: this.getRandomPhoneNumber(), 时间
        timer: this.getRandomTimer(),
        // area: this.getRandomArea(accurateArea) 奖品
        gift: this.getRandomGift(),
        // 头像
        icon: this.getRandomIcon(i)

      })
    }
    return customerArr
  },
  
  
  isAlipay: ua.indexOf('AliApp') > -1,
  isDingTalk: ua.indexOf('DingTalk') > -1,
  isWeixin: ua.indexOf('MicroMessenger') > -1,
  isBaidu: ua.indexOf('baiduboxapp') > -1,
  isAndroid: ua.indexOf('Android') > -1 || ua.indexOf('Adr') > -1,
  isIos: !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
  isWebkit: ua.indexOf('AppleWebKit') > -1,
  //isBaiduWebView: /swan\//.test(window.ua) || /^webswan-/.test(window.name), //是否为百度小程序中打开
  isBaiduWebView: false,
  isBaiduNativeUrl(url) {
    return url.split('://')[0] == "baiduboxapp"
  },
  
  // 解析支付宝链接
  urlToKeyValue(url) {
    // my && my.alert({
    //     content: '跳转链接是' + url
    // });
    console.log('跳转链接是' + url);
    var queryObj = {};
    let query = '';
    const appId = url.split('?')[1].split('&')[0].split('=')[1];
    // const index1 = url.indexOf('?'); // 第一个问号一定存在
    // const path = url.slice(index1).split('&')[1].split('=')[1];
    const indexA = url.indexOf('&page='); // 查找&page=的位置
    const indexB = url.indexOf('&query='); // 查找&query=的位置
    const path = indexB === -1 ? url.slice(indexA + 6) : url.slice(indexA + 6, indexB);
    console.log('-----------------------path');
    console.log(path);

    if (indexB > -1) {
      query = url.slice(indexB + 7);
      console.log('-----------------------query');
      console.log(query);
    }

    return {
      appId,
      path: path,
      query: query
    };
  },
  goToAlipayNative(url) {
    let _this = this;
    if (this.isAlipay) { // 支付宝域内
      // let my = require('my')
      my && my.getEnv(function (res) {
        if (res.miniprogram) { // 小程序环境
          my && my.postMessage({
            'eventName': 'goToAlipayNative',
            'url': _this.addKpm(decodeURIComponent(decodeURIComponent(url)))
          })
        } else {
          navigate(_this.addKpm(decodeURIComponent(decodeURIComponent(url))))
        }
      })
    } else { // 非支付宝域内 唤起支付宝
      const { appId, path, query } = this.urlToKeyValue(_this.addKpm(decodeURIComponent(decodeURIComponent(url))));
      console.log({
        appId,
        path,
        query
      });
      const toUrl = `alipays://platformapi/startapp?appId=${appId}&page=${encodeURIComponent(decodeURIComponent(decodeURIComponent(path)))}&query=${encodeURIComponent(decodeURIComponent(decodeURIComponent(query)))}`
      navigate(`https://ds.alipay.com/?scheme=${encodeURIComponent(toUrl)}`)
    }
  },
  
  //打开百度小程序
  goToBaiduNative(url) {
    var _appKey = url.split('://')[1].split('/')[1];
    var _tempUrl = url.split('://')[1].split('/');
    _tempUrl.splice(0, 2);
    var _path = _tempUrl.join('/').split('?')[0];
    var _query = {};
    _tempUrl.join('/').split('?')[1].split('&').forEach(function (item) {
      _query[item.split('=')[0]] = item.split('=')[1]
    })
    if (this.isBaiduNativeUrl(url)) {
      window.swanInvoke({
        appKey: _appKey,
        path: _path,
        query: _query
      });
    }
  },
  
  
  // 深拷贝
  deepClone(obj) {
    return JSON.parse(JSON.stringify(obj))
  },
  // 设置具有有效时间个local storage
  // expires有效期:毫秒
  setLocalStorage(storageName, value, expires) {
    localStorage.setItem(storageName, value);
    if (expires) {
      localStorage.setItem(storageName + '__expires__', new Date().getTime() + expires);
    }
  },
  // 设置具有有效时间个local storage
  // expires有效期:天
  setLocalStorageDay(storageName, value, expiresDay = 1) {
    localStorage.setItem(storageName, value);
    if (expiresDay) {
      let now = new Date();
      let expiresDate = new Date(`${now.getFullYear()}/${now.getMonth() + 1}/${now.getDate()}`).getTime() + 24 * 60 * 60 * 1000 * expiresDay;
      localStorage.setItem(storageName + '__expires__', expiresDate);
    }
  },
  getLocalStorage(storageName) {
    if (localStorage.getItem(storageName + '__expires__')) {
      if (localStorage.getItem(storageName + '__expires__') - new Date().getTime() < 0) {
        localStorage.removeItem(storageName + '__expires__');
        localStorage.removeItem(storageName);
        return null
      }
    }
    return localStorage.getItem(storageName)
  },

   

  // 返回地址注入
  setBackUrl(url) {
    if (window.history && window.history.pushState) {
      window.addEventListener("popstate", function (e) {
        if (url) {
          navigate(url); //此处可改为任意地址
        } else {
          back();
        }
      }, false);
    }
    window.history.pushState('forward', null, '#'); //在IE中必须得有这两行
    window.history.forward(1);
  },
  
  amendProvince(uri) {
    if (!uri) return ''
    return uri.split("省").join("")
      .split("市").join("")
      .split("维吾尔").join("")
      .split("自治区").join("")
      .split("壮族").join("")
      .split("回族").join("")
  },
  amendCity(uri) {
    if (!uri) return ''
    return uri.split("市").join("")
      .split("白族").join("")
      .split("回族").join("")
      .split("傣族").join("")
      .split("景颇族").join("")
      .split("壮族").join("")
      .split("苗族").join("")
      .split("彝族").join("")
      .split("哈尼族").join("")
      .split("藏族").join("")
      .split("朝鲜族").join("")
      .split("羌族").join("")
      .split("哈萨克").join("")
      .split("蒙古").join("")
      .split("黎族").join("")
      .split("土家族").join("")
      .split("侗族").join("")
      .split("布依族").join("")
      .split("自治州").join("")
      .split("盟").join("")
      .split("地区").join("")
      .split("自治县").join("")
      .split("林区").join("")

  },
  amendArea(uri) {
    if (!uri) return ''
    return uri.split("县").join("")
      .split("区").join("")
      .split("市").join("")
      .split("自治县").join("")
      .split("县级市").join("")
      .split("旗").join("")
      .split("自治旗").join("")
      .split("林区").join("")
      .split("特区").join("")
      .split("（特别行政区非政权性区）").join("")

  },
  loadingShow() {
    let div = document.createElement("div");
    div.className = "base-loader-bg";
    div.id = "baseLoding";
    let childDiv = document.createElement("div");
    childDiv.className = "base-loader"
    div.appendChild(childDiv);
    let dot = document.createElement("div");
    dot.className = "base-loader-dot base-loader-white"
    childDiv.appendChild(dot);
    let dot2 = document.createElement("div");
    let dot3 = document.createElement("div");
    let dot4 = document.createElement("div");
    let dot5 = document.createElement("div");
    dot2.className = "dot";
    dot3.className = "dot";
    dot4.className = "dot";
    dot5.className = "dot";
    childDiv.appendChild(dot2);
    childDiv.appendChild(dot3);
    childDiv.appendChild(dot4);
    childDiv.appendChild(dot5);
    document.body.appendChild(div);
  },
  loadingHide() {
    var node = document.getElementById('baseLoding');
    node.parentNode.removeChild(node);
  },

  base64Encode: (data) => {
    return Base64.encode(data)
  },

}
export default baseFn;