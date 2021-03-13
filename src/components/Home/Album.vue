<!-- 相册 -->
<template>
  <div class='album'>
    <!-- 还没打开相册的时候 -->
    <div v-show="showImage">
      <!-- 创建相册按钮 -->
      <el-button @click="create_album_dialog = true;album_name = '';">创建一个新相册</el-button>

      <el-dialog title="创建新相册" :visible.sync="create_album_dialog" width="30%">
        <el-input v-model="album_name" placeholder="请输入相册名称" maxlength="15"></el-input>
        <span slot="footer" class="dialog-footer">
          <el-button @click="create_album_dialog = false;">取 消</el-button>
          <el-button type="primary" @click="send_album_name">确 定</el-button>
        </span>
      </el-dialog>

      <!-- 展示相册 -->
      <el-row :gutter="20">
        <el-col v-for="(item,index) in albumList" :key="index" :span="6">
          <el-card :body-style="{ padding: '0px' }"  shadow="hover">
            <img :src="item['album_cover']" class="image" @click="open_album(item['album_id'])">
            <div style="padding: 4px;">
              <span>{{item['album_name']}}</span>
            </div>
             <el-button type="danger" icon="el-icon-delete" circle class="delete_album" @click="delete_index = index;delete_album_dialog = true"></el-button>
          </el-card>

          <el-dialog title="删除相册" :visible.sync="delete_album_dialog" width="30%">
            <p>确定删除相册以及里面的所有照片吗？</p>
            <span slot="footer" class="dialog-footer">
              <el-button @click="delete_album_dialog = false">取 消</el-button>
              <el-button type="primary" @click="delete_album">确 定</el-button>
            </span>
          </el-dialog>

        </el-col>
      </el-row>

    </div>
    
    <!-- 相册的内容 -->
    <el-row :gutter="20" v-show="!showImage">
      <el-page-header @back="showImage = true"></el-page-header>
      <el-col v-for="(image,index) in imageList" :key="index" :span="4">
        <el-card>
          <el-image :src="image['pic_url']" fit="fill" @click="showP(image['pic_url'])" width="100%"></el-image>
          <el-button type="danger" icon="el-icon-delete" circle class="delete_album" @click="delete_photo_index = index;delete_photo_dialog = true"></el-button>
        </el-card>

        <el-dialog title="删除相片" :visible.sync="delete_photo_dialog" width="30%">
            <p>确定删除这张照片吗？</p>
            <span slot="footer" class="dialog-footer">
              <el-button @click="delete_photo_dialog = false">取 消</el-button>
              <el-button type="primary" @click="delete_photo">确 定</el-button>
            </span>
          </el-dialog>
      </el-col>
      <el-col :span="4">
        <el-upload action="addPhoto/" list-type="picture-card" :on-success='add_photo' :show-file-list='false' class="add_photo_button" :data="{'album_id':album_id}">
          <i class="el-icon-plus"></i>
        </el-upload>
      </el-col>
    </el-row>

    <el-dialog title="Photo" :visible.sync="showPhoto" width="60%">
      <el-image :src="photoUrl" alt=""></el-image>
    </el-dialog>
  </div>
</template>

<script>
import Image from '../../../../../html/test/vuecli/vuerouter_1/src/views/Image.vue';
  import {send_data} from '../../network/vuex_axios'

export default {
  name: '',
  //import引入的组件需要注入到对象中才能使用
  components: {Image},
  data() {return {
    album_id : '',
    delete_index:'',
    delete_photo_index: '',
    album_name: '',
    showImage: true,
    create_album_dialog: false,
    delete_album_dialog: false,
    delete_photo_dialog: false,
    showPhoto: false,
    photoUrl: '',
    albumList: [],
    imageList: []
  };},
//监听属性 类似于data概念
  computed: {},
//监控data中的数据变化
  watch: {},
//方法集合
  methods: {
    showP (url) {
      this.showPhoto = ! this.showPhoto
      this.photoUrl = url
    },
    send_album_name() {
      send_data({
        url: 'setAlbum/',
        data: {
          user_id : this.$store.state.user_id,
          album_name : this.album_name
        }
      })
      .then((res) => {
        const new_album = {
          album_id:res.data,
          album_name:this.album_name,
          album_cover:"https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1730713693,2130926401&fm=26&gp=0.jpg"
        }
        console.log(new_album)
        this.albumList.push(new_album)
        console.log(this.albumList)
      })
      this.create_album_dialog = false
    },
    delete_album() {
      const album_id = this.albumList[this.delete_index]['album_id']
      send_data({
        url: 'deleteAlbum/',
        data: {"album_id":album_id}
      })
      .then((res) => {
        this.albumList.splice(this.delete_index,1)
      })
      this.delete_album_dialog = false
    },
    open_album(album_id) {
      this.album_id = album_id
      this.showImage = false
      send_data({
        url: 'getPhotos/',
        data: {album_id}
      })
      .then((res) => {
        this.imageList = res.data.photos
      })
    },
    add_photo(res,file,filelist) {
      this.imageList.push(res.result)
    },
    delete_photo() {
      const photo_id = this.imageList[this.delete_photo_index]['pic_id']
      send_data({
        url: 'deletePhoto/',
        data: {"pic_id": photo_id}
      })
      .then((res) => {
        this.imageList.splice(this.delete_photo_index,1)
      })
      this.delete_photo_dialog = false
    }
  },
//生命周期 - 创建完成（可以访问当前this实例）
  created() {
    send_data({
        url:'getAlbum/',
        data: {
          user_id : this.$store.state.user_id
        }
      })
      .then((res) => {
        this.albumList = res.data.data
      })

  },
//生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {

  },
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
  }
</script>
<style>
  .album{
    padding: 20px;
  }

  .album .el-col {
    padding: 10px;
  }

  .album .el-card {
    padding: 10px;
    position: relative;
  }

  .album .el-card:hover .delete_album {
    display: inline-block;
  }

  .album .delete_album {
    position: absolute;
    top: 5px;
    right: 5px;
    padding: 5px;
    display: none;
  }

  .album .image {
    width: 100%;
    height: 180px;
  }

  .album .el-upload {
    width: 100%;
    height: 0;
    padding-bottom: 100%;
    position: relative;
  }

  .album .add_photo_button i {
    position: absolute;
    top: calc(50% - 14px);
    left: calc(50% - 14px);
  }

  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }
  
  .clearfix:after {
      clear: both
  }
</style>