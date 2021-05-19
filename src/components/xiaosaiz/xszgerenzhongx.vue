<template>
    <div style="height: 700px">
        <h1>个人中心</h1>
        <el-container>
            <el-aside></el-aside>

            <el-main id="main1">
<!--                登录进来显示头像,可编辑此用户的个人信息-->
                <div id="div1">
                    <el-image  src="ss" style="width: 200px;height: 200px;"></el-image>
                    <el-button type="primary" @click="biangji">编辑个人信息</el-button>
                </div>
            </el-main>

            <el-main id="main2">
<!--                相当于模糊查询 输入鼠标离开就查询相对应的自提点-->
<!--                <el-row>-->
<!--                    <el-col :span="3"><span>自提点:</span></el-col>-->
<!--                    <el-col :span="8">-->
<!--                        <el-input v-model="value" placeholder="请输入自提点"></el-input>-->
<!--                    </el-col>-->
<!--                    <el-col :span="8">-->
<!--&lt;!&ndash;                        查询所有供应商展示在弹出框里面&ndash;&gt;-->
<!--                        <el-popover-->
<!--                                placement="right"-->
<!--                                width="400"-->
<!--                                trigger="click">-->
<!--                            <el-table :data="1">-->
<!--                                <el-table-column width="100" property="name" label="自提点名字"></el-table-column>-->
<!--                                <el-table-column width="150" property="date" label="自提点联系方式"></el-table-column>-->
<!--                                <el-table-column width="3 00" property="address" label="自提点地址"></el-table-column>-->
<!--                            </el-table>-->
<!--                            <el-button slot="reference">所有自提点</el-button>-->
<!--                        </el-popover>-->
<!--                    </el-col>-->
<!--                </el-row>-->

                <div style="margin-top: 50px">
                    <el-row>
                        <el-col :span="12">
                            <el-button type="warning" @click="shanghui">申请商户</el-button>
                            <el-button type="primary" @click="gyshang">申请供应商</el-button>
                        </el-col>
                    </el-row>
                </div>
                <div style="margin-top: 65px">
<!--            根据用户去判断是否有供应商和商户在去隐藏-->
                    <el-row>
                        <el-col :span="15">
                            <el-button  v-show="userlog.userboutten!=null"  type="success"  @click="beibei">后台管理</el-button>
                            <el-button  v-show="userlog.upsupplier!=null"  type="primary" @click="laojiang">供应商后台</el-button>
                            <el-button  v-show="userlog.upbusiness!=null" type="warning" @click="hesijie">商户后台</el-button>
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
                        <el-tabs v-model="activeName" style="height: 500px" @tab-click="handleClick">
                            <el-tab-pane label="全部订单" name="first">
                                <template>

                                    <el-table
                                            :data="tableData"
                                            border
                                            style="width: 100%">
                                        <el-table-column
                                                prop="udddingdan"
                                                label="订单号"
                                                width="180">
                                        </el-table-column>
                                        <el-table-column
                                                prop="ucount"
                                                label="数量"
                                                width="180">
                                        </el-table-column>
                                        <el-table-column
                                                prop="uzhuangtai"
                                                label="状态">
                                          <template slot-scope="scope">
                                            <el-link :underline="false" v-show="scope.row.uzhuangtai=='f001'">待付款</el-link>
                                            <el-link :underline="false" v-show="scope.row.uzhuangtai=='f002'">已付款</el-link>
                                            <el-link :underline="false" v-show="scope.row.uzhuangtai=='f003'">待发货</el-link>
                                            <el-link :underline="false" v-show="scope.row.uzhuangtai=='f004-1'">待提货</el-link>
                                            <el-link :underline="false" v-show="scope.row.uzhuangtai=='f005'">已提货</el-link>
                                          </template>
                                        </el-table-column>
                                      <el-table-column
                                        prop="udtime"
                                        label="时间">
                                      </el-table-column>
                                      <el-table-column
                                        prop=""
                                        label="操作">
                                        <template slot-scope="scope">
                                          <el-button type="primary" @click="Allchakan(scope.row.uddid)">查看</el-button>
                                        </template>
                                      </el-table-column>
                                    </el-table>
                                </template>
                              <el-pagination
                                @size-change="handleSizeChange"
                                @current-change="handleCurrentChange"
                                :current-page.sync="currentPage1"
                                :page-size="5"
                                layout="prev, pager, next, jumper"
                                :total="totall">
                              </el-pagination>
                            </el-tab-pane>


                            <el-tab-pane label="待支付" name="second">
                                <template>
                                  <el-table
                                    :data="tableData1"
                                    border
                                    style="width: 100%">
                                    <el-table-column
                                      prop="udddingdan"
                                      label="订单号"
                                      width="180">
                                    </el-table-column>
                                    <el-table-column
                                      prop="ucount"
                                      label="数量"
                                      width="180">
                                    </el-table-column>
                                    <el-table-column
                                      prop="uzhuangtai"
                                      label="状态">
                                      <template slot-scope="scope">
                                        <el-link :underline="false" v-show="scope.row.uzhuangtai=='f001'">待付款</el-link>
                                        <el-link :underline="false" v-show="scope.row.uzhuangtai=='f002'">已付款</el-link>
                                        <el-link :underline="false" v-show="scope.row.uzhuangtai=='f003'">待发货</el-link>
                                        <el-link :underline="false" v-show="scope.row.uzhuangtai=='f004-1'">待提货</el-link>
                                        <el-link :underline="false" v-show="scope.row.uzhuangtai=='f005'">已提货</el-link>
                                      </template>
                                    </el-table-column>
                                    <el-table-column
                                      prop="udtime"
                                      label="时间">
                                    </el-table-column>
                                    <el-table-column
                                      prop=""
                                      label="操作">
                                      <template slot-scope="scope">
                                        <el-button type="primary" @click="Allchakan(scope.row.uddid)">查看</el-button>
                                        <el-button type="primary" @click="Allfukuan(scope.row.uddid)">付款</el-button>
                                      </template>
                                    </el-table-column>
                                  </el-table>
                                </template>
                              <el-pagination
                                @size-change="handleSizeChange2"
                                @current-change="handleCurrentChange2"
                                :current-page.sync="currentPage2"
                                :page-size="5"
                                layout="prev, pager, next, jumper"
                                :total="totall2">
                              </el-pagination>
                            </el-tab-pane>

                          <el-tab-pane label="待发货" name="firstFHuo">
                            <template>

                              <el-table
                                :data="tableData5"
                                border
                                style="width: 100%">
                                <el-table-column
                                  prop="udddingdan"
                                  label="订单号"
                                  width="180">
                                </el-table-column>
                                <el-table-column
                                  prop="ucount"
                                  label="数量"
                                  width="180">
                                </el-table-column>
                                <el-table-column
                                  prop="uzhuangtai"
                                  label="状态">
                                  <template slot-scope="scope">
                                    <el-link :underline="false" v-show="scope.row.uzhuangtai=='f001'">待付款</el-link>
                                    <el-link :underline="false" v-show="scope.row.uzhuangtai=='f002'">已付款</el-link>
                                    <el-link :underline="false" v-show="scope.row.uzhuangtai=='f003'">待发货</el-link>
                                    <el-link :underline="false" v-show="scope.row.uzhuangtai=='f004-1'">待提货</el-link>
                                    <el-link :underline="false" v-show="scope.row.uzhuangtai=='f005'">已提货</el-link>
                                  </template>
                                </el-table-column>
                                <el-table-column
                                  prop="udtime"
                                  label="时间">
                                </el-table-column>
                                <el-table-column
                                  prop=""
                                  label="操作">
                                  <template slot-scope="scope">
                                    <el-button type="primary" @click="Allchakan(scope.row.uddid)">查看</el-button>
                                  </template>
                                </el-table-column>
                              </el-table>
                            </template>
                            <el-pagination
                              @size-change="handleSizeChange5"
                              @current-change="handleCurrentChange5"
                              :current-page.sync="currentPage5"
                              :page-size="5"
                              layout="prev, pager, next, jumper"
                              :total="totall5">
                            </el-pagination>
                          </el-tab-pane>

                            <el-tab-pane label="待提货" name="third">
                                <template>
                                  <el-table
                                    :data="tableData2"
                                    border
                                    style="width: 100%">
                                    <el-table-column
                                      prop="udddingdan"
                                      label="订单号"
                                      width="180">
                                    </el-table-column>
                                    <el-table-column
                                      prop="ucount"
                                      label="数量"
                                      width="180">
                                    </el-table-column>
                                    <el-table-column
                                      prop="uzhuangtai"
                                      label="状态">
                                      <template slot-scope="scope">
                                        <el-link :underline="false" v-show="scope.row.uzhuangtai=='f001'">待付款</el-link>
                                        <el-link :underline="false" v-show="scope.row.uzhuangtai=='f002'">已付款</el-link>
                                        <el-link :underline="false" v-show="scope.row.uzhuangtai=='f003'">待发货</el-link>
                                        <el-link :underline="false" v-show="scope.row.uzhuangtai=='f004-1'">待提货</el-link>
                                        <el-link :underline="false" v-show="scope.row.uzhuangtai=='f005'">已提货</el-link>
                                      </template>
                                    </el-table-column>
                                    <el-table-column
                                      prop="udtime"
                                      label="时间">
                                    </el-table-column>
                                    <el-table-column
                                      prop=""
                                      label="操作">
                                      <template slot-scope="scope">
                                        <el-button type="primary" @click="Allchakan(scope.row.uddid)">查看</el-button>
                                        <el-button type="primary" @click="Alltihuo(scope.row.uddid)">提货</el-button>
                                      </template>
                                    </el-table-column>
                                  </el-table>
                                </template>
                              <el-pagination
                                @size-change="handleSizeChange3"
                                @current-change="handleCurrentChange3"
                                :current-page.sync="currentPage3"
                                :page-size="5"
                                layout="prev, pager, next, jumper"
                                :total="totall3">
                              </el-pagination>
                            </el-tab-pane>


                            <el-tab-pane label="已提货" name="fourth">
                                <template>
                                  <el-table
                                    :data="tableData3"
                                    border
                                    style="width: 100%">
                                    <el-table-column
                                      prop="udddingdan"
                                      label="订单号"
                                      width="180">
                                    </el-table-column>
                                    <el-table-column
                                      prop="ucount"
                                      label="数量"
                                      width="180">
                                    </el-table-column>
                                    <el-table-column
                                      prop="uzhuangtai"
                                      label="状态">
                                      <template slot-scope="scope">
                                        <el-link :underline="false" v-show="scope.row.uzhuangtai=='f001'">待付款</el-link>
                                        <el-link :underline="false" v-show="scope.row.uzhuangtai=='f002'">已付款</el-link>
                                        <el-link :underline="false" v-show="scope.row.uzhuangtai=='f003'">待发货</el-link>
                                        <el-link :underline="false" v-show="scope.row.uzhuangtai=='f004'">待提货</el-link>
                                        <el-link :underline="false" v-show="scope.row.uzhuangtai=='f005'">已提货</el-link>
                                      </template>
                                    </el-table-column>
                                    <el-table-column
                                      prop="udtime"
                                      label="时间">
                                    </el-table-column>
                                    <el-table-column
                                      prop=""
                                      label="操作">
                                      <template slot-scope="scope">
                                        <el-button type="primary" @click="Allchakan(scope.row.uddid)">查看</el-button>
                                      </template>
                                    </el-table-column>
                                  </el-table>
                                </template>
                              <el-pagination
                                @size-change="handleSizeChange4"
                                @current-change="handleCurrentChange4"
                                :current-page.sync="currentPage4"
                                :page-size="5"
                                layout="prev, pager, next, jumper"
                                :total="totall4">
                              </el-pagination>
                            </el-tab-pane>
                        </el-tabs>
                    </template>
                </div>
<!--      文件上传测试-->
<!--              <form action="http://localhost:8090/tian/file.action"  enctype="multipart/form-data" method="post">-->
<!--                <input type="file" name="file">-->
<!--                <input type="submit" value="确定">-->
<!--              </form>-->

            </el-footer>
        </el-container>

    <!--模态框-->
      <el-dialog title="订单" :visible.sync="dialogTableVisible">
        <el-table :data="gridData">
          <el-table-column property="sname" label="商品名" width="150"></el-table-column>
          <el-table-column property="simg" label="图片" width="150">
            <template slot-scope="scope">
              <img style="width: 52px;height: 80px" :src="scope.row.simg" alt="没有">
            </template>
          </el-table-column>
          <el-table-column property="sprice" label="单价" width="200"></el-table-column>
          <el-table-column property="scount" label="数量"></el-table-column>
          <el-table-column property="schandi" label="生产地址"></el-table-column>
        </el-table>
      </el-dialog>


      <!--全选支付密码-->
      <el-dialog title="支付密码" :visible.sync="qxpassword">

        <el-form :model="qxzf">
          <el-form-item label="支付密码：" :label-width="formLabelWidth">
            <el-input v-model="qxzf.name"  type="password" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="qxpassword=false">取 消</el-button>
          <el-button type="primary" @click="qxzfok">确 定</el-button>
        </div>
      </el-dialog>

      <!--商户注册-->
      <el-dialog title="商户注册" :visible.sync="dialogFormVisible">
        <el-form :model="form" :rules="rules"  ref="form" label-width="80px">
          <el-form-item label="商户名称" prop="shname" :label-width="formLabelWidth">
            <el-input v-model="form.shname" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="负责人名称" prop="shfuzename" :label-width="formLabelWidth">
            <el-input v-model="form.shfuzename" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="联系方式" prop="shphone" :label-width="formLabelWidth">
            <el-input v-model="form.shphone" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="店铺地址" prop="shaddr" :label-width="formLabelWidth">
            <el-input v-model="form.shaddr" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="身份证" prop="shfuzecard" :label-width="formLabelWidth">
            <el-input v-model="form.shfuzecard" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="营业执照"  :label-width="formLabelWidth">

            <el-upload
              class="upload-demo"
              action="https://jsonplaceholder.typicode.com/posts/"
              :limit="1"
              :on-success="chanfile"
              :file-list="fileList"
              list-type="picture">
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>

          </el-form-item>
          <el-form-item label="店铺注册日期" prop="shzhucetime" :label-width="formLabelWidth">
            <el-date-picker type="date" placeholder="选择日期" v-model="form.shzhucetime" style="width: 100%;"></el-date-picker>
          </el-form-item>

        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitForm('form')">确 定</el-button>
        </div>
      </el-dialog>


      <!--供应商注册-->
      <el-dialog title="供应商注册" :visible.sync="dialog">
        <el-form :model="formm"   ref="form" label-width="80px">
          <el-form-item label="公司名称" prop="gname" :label-width="formLabelWidth">
            <el-input v-model="formm.gname" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="地址" prop="gaddre" :label-width="formLabelWidth">
            <el-input v-model="formm.gaddre" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="电话" prop="gphone" :label-width="formLabelWidth">
            <el-input v-model="formm.gphone" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="类型" prop="gzhutitype" :label-width="formLabelWidth">
            <el-input v-model="formm.gzhutitype" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="姓名" prop="gfaname" :label-width="formLabelWidth">
            <el-input v-model="formm.gfaname" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="身份证" prop="gfarcard" :label-width="formLabelWidth">
            <el-input v-model="formm.gfarcard" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="营业执照"  :label-width="formLabelWidth">

            <el-upload
              class="upload-demo"
              action="https://jsonplaceholder.typicode.com/posts/"
              :limit="1"
              :on-success="chanfile"
              :file-list="fileList"
              list-type="picture">
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>

          </el-form-item>
          <el-form-item label="店铺注册日期" prop="gzhucetime" :label-width="formLabelWidth">
            <el-date-picker type="date" placeholder="选择日期" v-model="formm.gzhucetime" style="width: 100%;"></el-date-picker>
          </el-form-item>

        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialog = false">取 消</el-button>
          <el-button type="primary" @click="submitFormm('formm')">确 定</el-button>
        </div>
      </el-dialog>


      <!--编辑个人信息-->
      <el-dialog title="个人信息" :visible.sync="dialoggrxx">
        <el-form :model="grxx"   label-width="80px">
          <el-form-item label="收货人姓名"  :label-width="formLabelWidth">
            <el-input v-model="grxx.udname" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="电话"  :label-width="formLabelWidth">
            <el-input v-model="grxx.udphone" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="地址"  :label-width="formLabelWidth">
            <el-input v-model="grxx.udaddr" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="头像"  :label-width="formLabelWidth">
            <el-upload
              class="upload-demo"
              action="https://jsonplaceholder.typicode.com/posts/"
              :limit="1"
              v-model="grxx.udimg"
              :on-success="chan"
              :file-list="filelisttt"
              list-type="picture">
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>

          </el-form-item>
          <el-form-item label="性别"  :label-width="formLabelWidth">
            <el-radio v-model="radio" label="男">男</el-radio>
            <el-radio  v-model="radio" label="女">女</el-radio>

          </el-form-item>
          <el-form-item label="支付密码"  :label-width="formLabelWidth">
            <el-input type="password" v-model="grxx.udpwd" autocomplete="off"></el-input>
          </el-form-item>


        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialoggrxx = false">取 消</el-button>
          <el-button type="primary" @click="ok">确 定</el-button>
        </div>
      </el-dialog>





    </div>
</template>

<script>
    export default {
        name: "xszgerenzhongx",
        data() {
            return {
              radio:"男",
              filelisttt:[],
              fileLists:[],
              fileList:[],//图片
              fil:"",
              fils:"",
              grfils:"",


              grxx:[],
              formm:[],
              form:[],
              dialogFormVisible:false,
              dialog:false,
              dialoggrxx:false,

              currentPage1:1,
              currentPage2:1,
              currentPage3:1,
              currentPage4:1,
              currentPage5:1,

              totall:0,
              totall2:0,
              totall3:0,
              totall4:0,
              totall5:0,

              pageon:1,//页
              pageon1:1,
              pageon2:1,
              pageon3:1,
              pageon4:1,
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
                value: '',
              qxzf:[],
              qxpassword:false,
              formLabelWidth:"120px",
                dialogTableVisible:false,
                gridData:[], //全选模态框商品
                userlog:"",//用户
              uddid:"",//购物单id uddid
                activeName:'first',//展开第几个选中



              tableData: [],
              tableData1: [],
              tableData2: [],
              tableData3: [],
              tableData5:[],

              rules: {
                shname: [
                  { required: true, message: '请输入商户名称', trigger: 'blur' },
                  { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                ],
                shfuzename:[
                  { required: true, message: '请输入正确姓名', trigger: 'blur' },
                  { min: 2, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
                ],
                shphone:[
                  { required: true, message: '请输入正确电话', trigger: 'blur' },
                  { min: 11, max: 11, message: '长度在 11 个字符', trigger: 'blur' }
                ],
                shaddr:[
                  { required: true, message: '请输入店铺地址', trigger: 'blur' },
                  { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
                ],
                shfuzecard:[
                  { required: true, message: '请输入身份证', trigger: 'blur' },
                  { min: 15, max: 18, message: '长度在 15 到 18 个字符', trigger: 'blur' }
                ],
                // shzhizhao:[
                //   { required: true, message: '请输入营业执照', trigger: 'blur' },
                //   { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                // ],
                shzhucetime:[
                  { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
                ],
              },



            }
        },

        methods: {
          //=========== 图片

          chanfile(response, file, fileList){
            this.fil=file.raw
          console.log(file.raw)
          },
          cg(file, fileList){
            console.log(file)
          },
          //===========



          handleSizeChange(val) {
             this.pageon=val
            this.tableAll();
            console.log(`每页 ${val} 条`);
          },
          handleCurrentChange(val) {
            this.pageon=val
            this.tableAll();

            console.log(`当前页: ${val}`);
          },

          handleSizeChange2(val) {
            this.pageon1=val
            this.Alldaizhif();
            console.log(`每页 ${val} 条`);
          },
          handleCurrentChange2(val) {
            this.pageon1=val
            this.Alldaizhif();

            console.log(`当前页: ${val}`);
          },
          handleSizeChange3(val) {
            this.pageon2=val
            this.Alldaitihuo();
            console.log(`每页 ${val} 条`);
          },
          handleCurrentChange3(val) {
            this.pageon2=val
            this.Alldaitihuo();

            console.log(`当前页: ${val}`);
          },
          handleSizeChange4(val) {
            this.pageon3=val
            this.yiAlldaitihuo();
            console.log(`每页 ${val} 条`);
          },
          handleCurrentChange4(val) {
            this.pageon3=val
            this.yiAlldaitihuo();

            console.log(`当前页: ${val}`);
          },
          handleSizeChange5(val) {
            this.pageon4=val
            this.Alldaifahuo();
            console.log(`每页 ${val} 条`);
          },
          handleCurrentChange5(val) {
            this.pageon4=val
            this.Alldaifahuo();

            console.log(`当前页: ${val}`);
          },


          shanghui(){ //商户注册
            var _this=this;
          var pa=new  URLSearchParams();
          pa.append("uid",JSON.parse(sessionStorage.getItem("xszuser")).uid)
            this.$axios.post("/GwcAll/pingshagn.action",pa).then(function (value) {
              if(value.data==null||value.data==''){
                _this.dialogFormVisible=true;
              }else{
                _this.$alert('已注册', '提示', {
                  confirmButtonText: '确定',
                  callback: action => {
                    _this.$message({
                      type: 'info',
                      message: `注册了`
                    });
                  }
                });
              }
            }).catch(function (val) {

            })



          },
          submitForm(form){ //商户确定
           // this.form.simg=this.fil.name
            var _this=this;
            this.$refs[form].validate((valid) => {
              if (valid) {

               var pars=new  URLSearchParams();
              pars.append("uid",JSON.parse(sessionStorage.getItem("xszuser")).uid)
              pars.append("shname",this.form.shname)
                pars.append("shfuzename",this.form.shfuzename)
                pars.append("shphone",this.form.shphone)
                pars.append("shaddr",this.form.shaddr)
                pars.append("shfuzecard",this.form.shfuzecard)
                pars.append("shzhizhao",this.fil.name)
                pars.append("shzhucetime",this.form.shzhucetime)
                pars.append("shzhuangtai","k001")

                this.$axios.post("/GwcAll/shangzc.action",pars).then(function (value) {
                  if(value.data==1){
                    _this.$alert('注册中', '提示', {
                      confirmButtonText: '确定',
                      callback: action => {
                        _this.$message({
                          type: 'info',
                          message: `成功`
                        });
                      }
                    });

                  }
                  _this.dialogFormVisible=false;
                }).catch(function (val) {
                    alert("错误")
                })




              } else {
                console.log('error submit!!');
                return false;
              }
            });

          },
          resetForm(formName) {
            this.$refs[formName].resetFields();
          },
          gyshang(){ //供应商
            var _this=this;
            var pa=new  URLSearchParams();
            pa.append("uid",JSON.parse(sessionStorage.getItem("xszuser")).uid)
            this.$axios.post("/GwcAll/gys.action",pa).then(function (value) {
              if(value.data==null||value.data==''){
                _this.dialog=true;
              }else{
                _this.$alert('已注册', '提示', {
                  confirmButtonText: '确定',
                  callback: action => {
                    _this.$message({
                      type: 'info',
                      message: `注册了`
                    });
                  }
                });
              }
            }).catch(function (val) {

            })



          },
          submitFormm(){
          var _this=this;

            var pars=new  URLSearchParams();
            pars.append("uid",JSON.parse(sessionStorage.getItem("xszuser")).uid)
            pars.append("gname",this.formm.gname)
            pars.append("gaddre",this.formm.gaddre)
            pars.append("gphone",this.formm.gphone)
            pars.append("gzhutitype",this.formm.gzhutitype)
            pars.append("gfaname",this.formm.gfaname)
            pars.append("gfarcard",this.formm.gfarcard)
            pars.append("gzhucetime",this.formm.gzhucetime)
            pars.append("gyingyeimg",this.fil.name)
            pars.append("gzhuangtai","g001")


            this.$axios.post("/GwcAll/gyshang.action",pars).then(function (value) {

              if(value.data==1){
                _this.$alert('注册中', '提示', {
                  confirmButtonText: '确定',
                  callback: action => {
                    _this.$message({
                      type: 'info',
                      message: `成功`
                    });
                  }
                });

              }
              _this.dialog=false;
            }).catch(function (val) {
              alert("错误")
            })



          },












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
            },






          tableAll(){ //查询全部
              var _this=this;
              var pars=new URLSearchParams();
              pars.append("pageNo",this.pageon)
              pars.append("pageSize",5)
              this.$axios.post("/GwcAll/yuAlldaitinhuo.action",pars).then(function (value) {
                _this.tableData=value.data.list
                _this.totall=value.data.total
              }).catch(function (val) {
                alert("异常错误")
              })


          },
          Allchakan(uddid){ //id
            var _this=this;

            var pars=new URLSearchParams()
            pars.append("uddid",uddid)
            this.$axios.post("/GwcAll/AllSelelId.action",pars).then(function (value) {
              _this.dialogTableVisible=true;

                _this.gridData=value.data.map((item)=>{
                  item.simg="http://localhost:8090/tian/"+item.simg;
                  return item;
                })


            }).catch(function (val) {
              alert("异常错误")
            })


          },
         Alldaizhif(){//待支付
           var _this=this;
           var pars=new URLSearchParams();
           pars.append("pageNo",this.pageon1)
           pars.append("pageSize",5)
            this.$axios.post("/GwcAll/Alldaifukuan.action",pars).then(function (value) {
              _this.tableData1=value.data.list
              _this.totall2=value.data.total

            }).catch(function (val) {
              alert("错误异常")
            })
         },
          Allfukuan(uddid){

            this.uddid=uddid
            this.qxpassword=true;
          },

          qxzfok(){ //确定
            var _this=this;

            var p=new URLSearchParams();
            p.append("mm",this.qxzf.name)
            p.append("uid",JSON.parse(sessionStorage.getItem("xszuser")).uid)
            this.$axios.post("/Gowuche/zf.action",p).then(function (value) {
              if(value.data==1){

                var pars=new URLSearchParams()
                pars.append("uddid",_this.uddid)
                _this.$axios.post("/GwcAll/AllSelelId.action",pars).then(function (value) {

                  var ar=JSON.stringify(value.data)
                  var zf={
                    headers: {
                      'Content-Type':'application/json;charset=UTF-8'
                    }
                  }
                  _this.$axios.post("/Gowuche/grzxquanxuan.action?uid="+JSON.parse(sessionStorage.getItem("xszuser")).uid+"&uddid="+_this.uddid,ar,zf).then(function (value) {

                    _this.$alert('成功', '提示', {
                      confirmButtonText: '确定',
                      callback: action => {
                        _this.$message({
                          type: 'info',
                          message: `成功`
                        });
                      }
                    });


                    _this.Alldaizhif()
                    _this.qxpassword=false;
                  }).catch(function (val) {
                    alert("异常错误")
                  })

                }).catch(function (val) {
                  alert("异常错误")
                })






              }
            }).catch(function (val) {
              alert("错误异常")
            })


          },

          Alldaifahuo(){ //待发货

            var _this=this;
            var pars=new URLSearchParams();
            pars.append("pageNo",this.pageon4)
            pars.append("pageSize",5)
            this.$axios.post("/GwcAll/Alldaifahuo.action",pars).then(function (value) {
              _this.tableData5=value.data.list
              _this.totall5=value.data.total

            }).catch(function (val) {
              alert("错误异常")
            })

          },

      Alldaitihuo(){ //待提货
        var _this=this;
        var pars=new URLSearchParams();
        pars.append("pageNo",this.pageon2)
        pars.append("pageSize",5)
        this.$axios.post("/GwcAll/Alldaitinhuo.action",pars).then(function (value) {
          _this.tableData2=value.data.list
          _this.totall3=value.data.total

        }).catch(function (val) {
          alert("错误异常")
        })

      },
          Alltihuo(uddid){ //提货
            var _this=this;
            var pars=new URLSearchParams();
            pars.append("uddid",uddid)


            this.$confirm('是否提货！！！！', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {

              this.$axios.post("/GwcAll/Alltihuo.action",pars).then(function (value) {

                _this.Alldaitihuo();
              }).catch(function (val) {
                alert("错误异常")
              })

              this.$message({
                type: 'success',
                message: '提货成功!'
              });
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消提货'
              });
            });






          },


          yiAlldaitihuo(){ //已提货
            var _this=this;
            var pars=new URLSearchParams();
            pars.append("pageNo",this.pageon3)
            pars.append("pageSize",5)
            this.$axios.post("/GwcAll/yuAlldaitinhuo.action",pars).then(function (value) {
              _this.tableData3=value.data.list
              _this.totall4=value.data.total

            }).catch(function (val) {
              alert("错误异常")
            })

          },






          handleClick(tab, event) {
            if(tab.label=="待支付"){
              this.Alldaizhif();
            }else if(tab.label=="待发货"){
              this.Alldaifahuo();
            }else if(tab.label=="待提货"){
              this.Alldaitihuo();
            }else if(tab.label=="已提货"){
              this.yiAlldaitihuo();
            }
          },


          chan(response, file, fileList){
            this.grfils=file.raw

          },

          biangji(){ //编辑
            var _this=this;
            var par=new URLSearchParams()
            par.append("uid",JSON.parse(sessionStorage.getItem("xszuser")).uid)

            this.$axios.post("/grzx/grselect.action",par).then(function (value) {
              _this.grxx=value.data
              _this.filelisttt=value.data.udimg
              _this.radio=value.data.udsex;
              _this.dialoggrxx=true;
            }).catch(function (val) {

            })


          },

        ok(){

            console.log(this.grfils)

          var _this=this;


          var arr=JSON.stringify(this.grxx)

          var zf={
            headers: {
              'Content-Type':'application/json;charset=UTF-8'
            }

          }

          this.$axios.post("/grzx/updatedtais.action?fil="+this.grfils.name+"&rade="+this.radio,arr,zf).then(function (value) {
            if(value.data==1){

              //==================== 图片上传
              var d=new FormData();
              d.append("file",_this.grfils) //this的值是grfils的raw值   必须和文件上传的值一样
              var zf={
                headers: {
                  'Content-Type':'multipart/form-data'  //必须加
                }
              }

              _this.$axios.post("/file.action",d,zf).then(function (value) {

                _this.$alert('修改成功', '提示', {
                  confirmButtonText: '确定',
                  callback: action => {
                    _this.$message({
                      type: 'info',
                      message: `修改成功`
                    });
                  }
                });

                _this.dialoggrxx=false;

              }).catch(function (val) {
                alert("错误异常")
              })

              //====================

            }



          }).catch(function (val) {

          })


        },









        },
        created() {
        this.tableAll();

        var userlogin=JSON.parse(sessionStorage.getItem("xszuser"))
        this.userlog=userlogin



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
