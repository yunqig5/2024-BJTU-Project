﻿<template>
  <div style="text-align: -webkit-center">
    <el-container>
      <el-header>
        <h1>仓库</h1>
      </el-header>
      <el-main>
        <div style="text-align:end">
          <el-button-group>
            <el-button @click="this.reload" icon="Refresh"></el-button>
            <el-button type="primary" @click="onAdding">
              <el-icon class="el-icon--right">
                <Plus />
              </el-icon>
            </el-button>
          </el-button-group>
        </div>
        <el-table :data="warehouses" style="width: 100%" empty-text="There aren't any warehouse!">
          <el-table-column prop="warehouseId" label="仓库 id"></el-table-column>
          <el-table-column prop="warehouseAddress" label="Address">
            <template #default="scope">
              <span v-if="!is_editing">{{ scope.row.warehouseAddress }}</span>
              <el-input v-model="scope.row.warehouseAddress" v-else-if="scope.$index === row_editing"></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="warehouseArea" label="Area (m²)">
            <template #default="scope">
              <span v-if="!is_editing">{{ scope.row.warehouseArea }}</span>
              <el-input v-model="scope.row.warehouseArea" v-else-if="scope.$index === row_editing"></el-input>
            </template>
          </el-table-column>
          <!-- <el-table-column prop="warehouseName" label="仓库 Name">
            <template #default="scope">
              <span v-if="!is_editing">{{ scope.row.warehouseName }}</span>
              <el-input v-model="scope.row.warehouseName" v-else-if="scope.$index === row_editing"></el-input>
            </template>
          </el-table-column> -->
          <el-table-column label="操作">
            <template #default="scope">
              <el-button v-show="!is_editing || (!is_editing && scope.$index === row_editing)" type="primary" round
                @click.prevent="editRow(scope.$index)" icon="Edit">Edit
              </el-button>
              <el-button v-show="!is_editing || (!is_editing && scope.$index === row_editing)" type="danger" round
                @click.prevent="deleteRow(scope.$index)" icon="Delete">
                Del
              </el-button>
              <el-button v-show="is_editing && scope.$index === row_editing" type="success" round
                @click.prevent="saveChange(scope.$index)" icon="Check">Save</el-button>
              <el-button v-show="is_editing && scope.$index === row_editing" type="info" round
                @click.prevent="cancelChange(scope.$index)" icon="Close">Cancel</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-main>
    </el-container>
    <AddWhDialog :show-dialog="is_adding" :title="addTitle" @closeDialog="closeAdding"></AddWhDialog>
    <!-- <EditWarehouse key="is_editing" :show-dialog="is_editing" :title="editTitle" :rowData="this.warehouse"
      @closeDialog="closeEditing"></EditWarehouse> -->
    <DeleteWarehouse key="is_deleting" :show-dialog="is_deleting" :title="deleteTitle" :rowData="this.warehouse"
      @closeDialog="cancelDeleting"></DeleteWarehouse>
    <!-- <SearchGoodInWarehouse key="is_searching" :show-dialog="is_searching" :title="searchingTitle"
      :rowData="this.warehouse" @closeDialog="cancelDeleting"></SearchGoodInWarehouse> -->
  </div>
</template>

<script>
import axios from "axios";
import AddWhDialog from "./AddWhDialog.vue";
import EditWarehouse from "./EditWarehouse.vue";
import DeleteWarehouse from "./DeleteWarehouse.vue";
// import SearchGoodInWarehouse from "./SearchGoodInWarehouse.vue"
import { useRouter } from "vue-router";
export default {
  name: "WarehouseTable",
  components: {
    AddWhDialog,
    EditWarehouse,
    DeleteWarehouse,
  },
  inject: ['reload'],
  data() {
    return {
      warehouses: [],
      warehouse: null,
      addTitle: 'New Warehouse',
      editTitle: 'Warehouse Information',
      deleteTitle: 'WARNING!',
      searchingTitle: 'Warehouse 货品',
      is_adding: false,
      is_editing: false,
      is_deleting: false,
      is_searching: false,
      row_editing: -1,
      router: useRouter(),
    }
  },
  methods: {
    getWarehouses() {
      axios({
        url: "http://localhost:9090/warehouses",
        method: 'GET',
      }).then((res) => {
        console.log(res.data);
        this.warehouses = res.data;
      });
    },
    onAdding() {
      this.is_adding = true;
    },
    onEditing() {
      this.is_editing = !this.is_editing;
    },
    closeAdding() {
      this.is_adding = false;
      this.reload();
    },
    closeEditing() {
      this.is_editing = false;
    },
    cancelDeleting() {
      this.is_deleting = false;
    },
    clickRow(row) {
      this.warehouse = row.data;
    },
    editRow(index) {
      this.warehouse = this.warehouses[index];
      this.is_editing = true;
      this.row_editing = index;
      console.log(this.row_editing);
    },
    deleteRow(index) {
      this.warehouse = this.warehouses[index];
      this.is_deleting = true;
    },
    saveChange(index) {
      this.warehouse = this.warehouses[index];
      this.is_editing = false;
      axios.post("http://localhost:9090/warehouses/updating", this.warehouse).then(res => {
        console.log(res)
      })
      this.reload();
    },
    cancelChange(index) {
      this.editRow = index;
      this.warehouses[index] = this.warehouse;
      this.is_editing = false;
      this.reload();
    },
	 },
  },
  mounted() {
    this.getWarehouses();
  }
};
</script>

<style>
</style>