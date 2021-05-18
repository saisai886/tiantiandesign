<template>
    <div style="height: 700px">
        <h1>个人中心</h1>
        <el-container>
            <el-aside></el-aside>

            <el-main id="main1">
<!--                登录进来显示头像,可编辑此用户的个人信息-->
                <div id="div1">
                    <el-image @click="na" src="ss" style="width: 200px;height: 200px;"></el-image>
                    <el-button type="primary">编辑个人信息</el-button>
                </div>
            </el-main>

            <el-main id="main2">
<!--                相当于模糊查询 输入鼠标离开就查询相对应的自提点-->
                <el-row>
                    <el-col :span="3"><span>自提点:</span></el-col>
                    <el-col :span="8">
                        <el-input v-model="value" placeholder="请输入自提点"></el-input>
                    </el-col>
                    <el-col :span="8">
<!--                        查询所有供应商展示在弹出框里面-->
                        <el-popover
                                placement="right"
                                width="400"
                                trigger="click">
                            <el-table :data="gridData">
                                <el-table-column width="100" property="name" label="自提点名字"></el-table-column>
                                <el-table-column width="150" property="date" label="自提点联系方式"></el-table-column>
                                <el-table-column width="3 00" property="address" label="自提点地址"></el-table-column>
                            </el-table>
                            <el-button slot="reference">所有自提点</el-button>
                        </el-popover>
                    </el-col>
                </el-row>

                <div style="margin-top: 50px">
                    <el-row>
                        <el-col :span="12">
                            <el-button type="warning" @click="">申请商户</el-button>
                            <el-button type="primary" @click="">申请供应商</el-button>
                        </el-col>
                    </el-row>
                </div>
                <div style="margin-top: 65px">
<!--            根据用户去判断是否有供应商和商户在去隐藏-->
                    <el-row>
                        <el-col :span="15">
                            <el-button type="success" @click="beibei">后台管理</el-button>
                            <el-button type="primary" @click="laojiang">供应商后台</el-button>
                            <el-button type="warning" @click="hesijie">商户后台</el-button>
                        </el-col>
                    </el-row>
                </div>
            </el-main>
            <el-aside></el-aside>
        </el-container>

        <el-container>
            <el-footer id="main3">
                <div>
                    <!--  查询相对应的数据-->
                    <template>
                        <el-tabs v-model="activeName" @tab-click="handleClick">
                            <el-tab-pane label="全部订单" name="first">
                                <template>

                                    <el-table
                                            :data="tableData"
                                            border
                                            style="width: 100%">
                                        <el-table-column
                                                prop="date"
                                                label="日期"
                                                width="180">
                                        </el-table-column>
                                        <el-table-column
                                                prop="name"
                                                label="姓名"
                                                width="180">
                                        </el-table-column>
                                        <el-table-column
                                                prop="address"
                                                label="地址">
                                        </el-table-column>
                                    </el-table>
                                </template>
                            </el-tab-pane>


                            <el-tab-pane label="待支付" name="second">
                                <template>
                                    <el-table
                                            :data="tableData"
                                            border
                                            style="width: 100%">
                                        <el-table-column
                                                prop="date"
                                                label="日期"
                                                width="180">
                                        </el-table-column>
                                        <el-table-column
                                                prop="name"
                                                label="姓名"
                                                width="180">
                                        </el-table-column>
                                        <el-table-column
                                                prop="address"
                                                label="地址">
                                        </el-table-column>
                                    </el-table>
                                </template>
                            </el-tab-pane>


                            <el-tab-pane label="代提货" name="third">
                                <template>
                                    <el-table
                                            :data="tableData"
                                            border
                                            style="width: 100%">
                                        <el-table-column
                                                prop="date"
                                                label="日期"
                                                width="180">
                                        </el-table-column>
                                        <el-table-column
                                                prop="name"
                                                label="姓名"
                                                width="180">
                                        </el-table-column>
                                        <el-table-column
                                                prop="address"
                                                label="地址">
                                        </el-table-column>
                                    </el-table>
                                </template>
                            </el-tab-pane>


                            <el-tab-pane label="已提货" name="fourth">
                                <template>
                                    <el-table
                                            :data="tableData"
                                            border
                                            style="width: 100%">
                                        <el-table-column
                                                prop="date"
                                                label="日期"
                                                width="180">
                                        </el-table-column>
                                        <el-table-column
                                                prop="name"
                                                label="姓名"
                                                width="180">
                                        </el-table-column>
                                        <el-table-column
                                                prop="address"
                                                label="地址">
                                        </el-table-column>
                                    </el-table>
                                </template>
                            </el-tab-pane>
                        </el-tabs>
                    </template>
                </div>
            </el-footer>
        </el-container>
    </div>
</template>

<script>
    export default {
        name: "xszgerenzhongx",
        data() {
            return {

                options: [{
                    value: '选项1',
                    label: '黄金糕'
                }, {
                    value: '选项2',
                    label: '双皮奶'
                }, {
                    value: '选项3',
                    label: '蚵仔煎'
                }, {
                    value: '选项4',
                    label: '龙须面'
                }, {
                    value: '选项5',
                    label: '北京烤鸭'
                }],
                value: ''
            }
        },

        methods: {

            beibei() {
                var uname = sessionStorage.getItem("yg");
                console.log(uname)
                if (uname == null) {
                    this.$router.push("/zb_denglu")
                } else {
                    this.$router.push("/zb_hotai")
                }

            },
            laojiang() {
                this.$router.push("/indexsup")
            },
            hesijie() {
                this.$router.push("/shanghuShouye")
            }

        }
    }
</script>

<style>

    #main1 {
        height: 300px;

    }

    #main2 {
        height: 300px;

    }

    #main3 {
        height: 400px;
        width: 1260px;
        margin-left: 300px;

    }

    el-aside {
        width: 200px;

    }

</style>
