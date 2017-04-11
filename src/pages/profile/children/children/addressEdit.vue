<template>
    <div class="order-detail-page child-page paddingTop">
        <head-top :back="true">
            <span slot='title' class="head-title">修改地址</span>
            <span slot='save' class="head-save">保存</span>
        </head-top>
        <div class="form-container">
            <div class="form-group name">
                <label>收货人</label>
                <input type="text" value="邵一波">
            </div>
            <div class="form-group mobile">
                <label>联系电话</label>
                <input type="text" value="13771084707">
            </div>
            <div class="form-group collapse-right area" @click="openPicker">
                <label>所在地区</label>
                <span>{{addressProvince}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{addressCity}}</span>
            </div>
            <div class="form-group address">
                <input type="text" placeholder="详细地址" value="江苏无锡滨湖区东南大学立业楼D区402">
            </div>
        </div>
        <div class="delete" @click="deleteAddress">删除地址</div>
        <mu-dialog :open="dialog" title="" @close="closeDialog">
            确认要删除该地址吗？
            <mu-flat-button slot="actions" @click="closeDialog" primary label="取消"/>
            <mu-flat-button slot="actions" primary @click="closeDialog" label="确定"/>
        </mu-dialog>
        <mu-popup position="bottom" popupClass="picker" :open="pickerIsShow" @close="closePicker">
            <div class="picker-head">
                <span class="cancle" @click="pickerIsShow = false">取消</span>
                <span class="confirm" @click="pickerConfirm">确认</span>
            </div>
            <mu-content-block>
                <mu-picker :slots="addressSlots" :visible-item-count="5" @change="pickerChange" :values="address"/>
            </mu-content-block>
        </mu-popup>

        <!-- <transition name="router-float" mode="out-in">
            <div v-show="pickerIsShow" class="area-picker">
                <div>
                    <div class="picker-head">
                        <span class="cancle" @click="pickerIsShow = false">取消</span>
                        <span class="confirm" @click="pickerConfirm">确认</span>
                    </div>
                    <mu-picker :slots="addressSlots" :visible-item-count="5" @change="pickerChange" :values="address"/>
                </div>
                <div class="shade"></div>
            </div>
        </transition> -->
    </div>
</template>
    
<script>
import { mapMutations } from 'vuex'
import headTop from 'components/headTop/headTop'

const address = {
  '北京': ['北京'],
  '广东': ['广州', '深圳', '珠海', '汕头', '韶关', '佛山', '江门', '湛江', '茂名', '肇庆', '惠州', '梅州', '汕尾', '河源', '阳江', '清远', '东莞', '中山', '潮州', '揭阳', '云浮'],
  '上海': ['上海'],
  '天津': ['天津'],
  '重庆': ['重庆'],
  '辽宁': ['沈阳', '大连', '鞍山', '抚顺', '本溪', '丹东', '锦州', '营口', '阜新', '辽阳', '盘锦', '铁岭', '朝阳', '葫芦岛'],
  '江苏': ['南京', '苏州', '无锡', '常州', '镇江', '南通', '泰州', '扬州', '盐城', '连云港', '徐州', '淮安', '宿迁'],
  '湖北': ['武汉', '黄石', '十堰', '荆州', '宜昌', '襄樊', '鄂州', '荆门', '孝感', '黄冈', '咸宁', '随州', '恩施土家族苗族自治州', '仙桃', '天门', '潜江', '神农架林区'],
  '四川': ['成都', '自贡', '攀枝花', '泸州', '德阳', '绵阳', '广元', '遂宁', '内江', '乐山', '南充', '眉山', '宜宾', '广安', '达州', '雅安', '巴中', '资阳', '阿坝藏族羌族自治州', '甘孜藏族自治州', '凉山彝族自治州'],
  '陕西': ['西安', '铜川', '宝鸡', '咸阳', '渭南', '延安', '汉中', '榆林', '安康', '商洛'],
  '河北': ['石家庄', '唐山', '秦皇岛', '邯郸', '邢台', '保定', '张家口', '承德', '沧州', '廊坊', '衡水'],
  '山西': ['太原', '大同', '阳泉', '长治', '晋城', '朔州', '晋中', '运城', '忻州', '临汾', '吕梁'],
  '河南': ['郑州', '开封', '洛阳', '平顶山', '安阳', '鹤壁', '新乡', '焦作', '濮阳', '许昌', '漯河', '三门峡', '南阳', '商丘', '信阳', '周口', '驻马店'],
  '吉林': ['长春', '吉林', '四平', '辽源', '通化', '白山', '松原', '白城', '延边朝鲜族自治州'],
  '黑龙江': ['哈尔滨', '齐齐哈尔', '鹤岗', '双鸭山', '鸡西', '大庆', '伊春', '牡丹江', '佳木斯', '七台河', '黑河', '绥化', '大兴安岭地区'],
  '内蒙古': ['呼和浩特', '包头', '乌海', '赤峰', '通辽', '鄂尔多斯', '呼伦贝尔', '巴彦淖尔', '乌兰察布', '锡林郭勒盟', '兴安盟', '阿拉善盟'],
  '山东': ['济南', '青岛', '淄博', '枣庄', '东营', '烟台', '潍坊', '济宁', '泰安', '威海', '日照', '莱芜', '临沂', '德州', '聊城', '滨州', '菏泽'],
  '安徽': ['合肥', '芜湖', '蚌埠', '淮南', '马鞍山', '淮北', '铜陵', '安庆', '黄山', '滁州', '阜阳', '宿州', '巢湖', '六安', '亳州', '池州', '宣城'],
  '浙江': ['杭州', '宁波', '温州', '嘉兴', '湖州', '绍兴', '金华', '衢州', '舟山', '台州', '丽水'],
  '福建': ['福州', '厦门', '莆田', '三明', '泉州', '漳州', '南平', '龙岩', '宁德'],
  '湖南': ['长沙', '株洲', '湘潭', '衡阳', '邵阳', '岳阳', '常德', '张家界', '益阳', '郴州', '永州', '怀化', '娄底', '湘西土家族苗族自治州'],
  '广西': ['南宁', '柳州', '桂林', '梧州', '北海', '防城港', '钦州', '贵港', '玉林', '百色', '贺州', '河池', '来宾', '崇左'],
  '江西': ['南昌', '景德镇', '萍乡', '九江', '新余', '鹰潭', '赣州', '吉安', '宜春', '抚州', '上饶'],
  '贵州': ['贵阳', '六盘水', '遵义', '安顺', '铜仁地区', '毕节地区', '黔西南布依族苗族自治州', '黔东南苗族侗族自治州', '黔南布依族苗族自治州'],
  '云南': ['昆明', '曲靖', '玉溪', '保山', '昭通', '丽江', '普洱', '临沧', '德宏傣族景颇族自治州', '怒江傈僳族自治州', '迪庆藏族自治州', '大理白族自治州', '楚雄彝族自治州', '红河哈尼族彝族自治州', '文山壮族苗族自治州', '西双版纳傣族自治州'],
  '西藏': ['拉萨', '那曲地区', '昌都地区', '林芝地区', '山南地区', '日喀则地区', '阿里地区'],
  '海南': ['海口', '三亚', '五指山', '琼海', '儋州', '文昌', '万宁', '东方', '澄迈县', '定安县', '屯昌县', '临高县', '白沙黎族自治县', '昌江黎族自治县', '乐东黎族自治县', '陵水黎族自治县', '保亭黎族苗族自治县', '琼中黎族苗族自治县'],
  '甘肃': ['兰州', '嘉峪关', '金昌', '白银', '天水', '武威', '酒泉', '张掖', '庆阳', '平凉', '定西', '陇南', '临夏回族自治州', '甘南藏族自治州'],
  '宁夏': ['银川', '石嘴山', '吴忠', '固原', '中卫'],
  '青海': ['西宁', '海东地区', '海北藏族自治州', '海南藏族自治州', '黄南藏族自治州', '果洛藏族自治州', '玉树藏族自治州', '海西蒙古族藏族自治州'],
  '新疆': ['乌鲁木齐', '克拉玛依', '吐鲁番地区', '哈密地区', '和田地区', '阿克苏地区', '喀什地区', '克孜勒苏柯尔克孜自治州', '巴音郭楞蒙古自治州', '昌吉回族自治州', '博尔塔拉蒙古自治州', '石河子', '阿拉尔', '图木舒克', '五家渠', '伊犁哈萨克自治州'],
  '香港': ['香港'],
  '澳门': ['澳门'],
  '台湾': ['台北市', '高雄市', '台北县', '桃园县', '新竹县', '苗栗县', '台中县', '彰化县', '南投县', '云林县', '嘉义县', '台南县', '高雄县', '屏东县', '宜兰县', '花莲县', '台东县', '澎湖县', '基隆市', '新竹市', '台中市', '嘉义市', '台南市']
}
export default {
    name: 'addressEdit',
    components: {
        'head-top': headTop,
    },
    data() {
        return {
            key: '',
            dialog: false,
            pickerIsShow: false,
            addressSlots: [
            {
                width: '100%',
                textAlign: 'right',
                values: Object.keys(address)
            }, {
                width: '100%',
                textAlign: 'left',
                values: ['北京']
            }
            ],
            picker1: '',
            picker2: '',
            address: ['北京', '北京'],
            addressProvince: '北京',
            addressCity: '北京',
              topPopup: false,
              leftPopup: false,
              rightPopup: false
        }
    },
    created() {
    },
    methods: {
        handleTabChange (val) {
            this.activeTab = val
        },
        pickerChange (value, index) {
            switch (index) {
                case 0:
                    this.picker1 = value
                    const arr = address[value]
                    this.addressSlots[1].values = arr
                    this.picker2 = arr[0]
                    break
                case 1:
                    this.picker2 = value
                    break
            }
            this.address = [this.picker1, this.picker2]
        },
        pickerConfirm() {
            this.addressProvince = this.address[0];
            this.addressCity = this.address[1];
            this.pickerIsShow = false;
        },
        deleteAddress() {
            this.dialog = true;
        },
        closeDialog() {
            this.dialog = false;
        },
        openPicker () {
            this.pickerIsShow = true;
        },
        closePicker (position) {
            this.pickerIsShow = false;
        }
    },
    beforeRouteEnter (to, from, next) {
        next(vm => {
            vm.key = vm.$route.query.key || '';
        })
    },
}
</script>

<style lang="scss">
@import '../../../../style/mixin';
.picker {
    width: 100%;
    background-color: #f9f9f9 !important;
    .picker-head {
        @include fbethoz;
        background-color: $theme;
        span {
            color: #fff;
            display: inline-block;
            width: 2rem;
            line-height: 1.4rem;
            text-align: center;
        }
    }
    .mu-content-block {
        .mu-picker {
            background-color: #f9f9f9;
        }
    }
}
</style>
<style lang="scss" scoped>
@import '../../../../style/mixin';

.collapse-right {
    position: relative;

    &:after {
        content: '';
        display: block;
        position: absolute;
        top: 50%;
        right: .6rem;
        transform: translate(0, -50%);
        width: .5rem;
        height: .5rem;
        @include bis('../../../../images/collapse_right.png');
    }
}

.form-container {
    background-color: #fff;
    .form-group {
        padding: 0 .6rem;
        border-bottom: 1px solid #eee;
        min-height: 2rem;
        label {
            display: inline-block;
            width: 20%;
            line-height: 2rem;
            text-align: left;
        }
        input {
            line-height: 2rem;
        }
        &.address {
            input {
                width: 100%;
            }
        }
    }
}

.delete {
    background-color: #fff;
    height: 2rem;
    line-height: 2rem;
    padding: 0 .6rem;
    margin-top: .6rem;
    text-align: left;
    color: $red;
}

.area-picker {
    position: fixed;
    bottom: 0;
    width: 100%;
    box-shadow: 0 3px 10px rgba(0,0,0,.156863), 0 3px 10px rgba(0,0,0,.227451);
    .picker-head {
        @include fbethoz;
        span {
            display: inline-block;
            width: 2rem;
            line-height: 1.4rem;
            text-align: center;
        }
    }
}

</style>