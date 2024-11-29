<template>
  <div>
    <van-popup round position="top" :style="{  }" v-bind="$attrs">
      <div style="height: 100%; position: relative">
        <div class="header">
          <van-icon name="filter-o"/>
          筛选
        </div>
        <div class="content">
          <van-form>
            <van-cell-group inset>

              <template v-for="item in items" :key="item.field">
                <van-field
                    v-if="item.type === 'dictSelect'"
                    v-model="dictSelect[item.field]"
                    :label="item.label"
                    :placeholder="item.label"
                    is-link
                    readonly
                    @click="handleFieldClick(item)"
                    v-bind="item.bind"
                ></van-field>

                <div v-else-if="item.type === 'date'">
                  <van-field
                      v-model="queryForm[item.field]"
                      readonly
                      is-link
                      :name="item.field"
                      :label="item.label"
                      :placeholder="item.label"
                      @click="handleOpenTimePopup1(item)"

                  />
                </div>

                <div v-else-if="item.type === 'daterange'">
                  <div class="pl-15">
                    <div class="mtb-10">
                      {{ item.label }}
                    </div>
                    <van-field
                        v-model="queryForm[item.field][0]"
                        readonly
                        is-link
                        name="startTime"
                        label="开始时间"
                        placeholder="开始时间"
                        :rules="[{ required: true, message: '请选择开始时间' }]"
                        @click="handleOpenTimePopup(item,'Start')"
                    />
                    <van-field
                        v-model="queryForm[item.field][1]"
                        readonly
                        is-link
                        name="endTime"
                        label="结束时间"
                        placeholder="结束时间"
                        :rules="[{ required: true, message: '请选择结束时间' }]"
                        @click="handleOpenTimePopup(item,'End')"

                    />
                  </div>


                </div>

                <van-field
                    v-else
                    v-model="queryForm[item.field]"
                    :label="item.label"
                    :placeholder="item.label"
                    v-bind="item.bind"
                ></van-field>
              </template>

            </van-cell-group>
          </van-form>
        </div>

        <div class="footer">
          <div class="button reset" @click="handleReset">重置</div>
          <div class="button confirm" @click="handleConfirm">确认</div>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script setup>

import {computed, nextTick, onMounted, reactive, ref, watch} from "vue";
import {createComponent} from "@/components/mountComponent/index.js";
import {arraysAreEqual} from "@/utils/index.js";
import {formatDate} from "@/utils/date.js";
import dayjs from "dayjs";
import {isEmpty} from "lodash-es";

const emits = defineEmits(['queryConfirm'])

const props = defineProps({
  items: Object,
})
const queryForm = ref({});
let queryItems = computed(() => {
  return Object.entries(queryForm.value).filter(([k, v]) => {
    if (Array.isArray(queryForm.value[k]) && !queryForm.value[k].length) {
      return false;
    }
    return queryForm.value[k];
  }).map(([k, v]) => {
    let cur = props.items.find(v => v.field === k);
    let opt = getOpt(cur);

    let params = {
      key: k,
      opt: opt,
    };

    let p = {};
    if (cur.type === 'date') {

    }
    if (opt === 'between') {
      if (cur.type === 'daterange') {
        p = {
          ...params,
          min: v[0],
          max: v[1]
          // group:'default',
        };
      } else if (cur.type === 'monthrange') {
        let month = formatDate(v[1], 'YYYY-MM');
        let day = dayjs(month).daysInMonth();
        p = {
          ...params,
          min: formatDate(v[0], `YYYY-MM-01`),
          max: formatDate(v[1], `YYYY-MM-${day}`),
          // group:'default',
        };
      } else if (cur.type === 'numrange') {
        p = {
          ...params,
          min: v[0] || '0',
          max: v[1] || '999'
          // group:'default',
        };
      } else {
        p = {
          ...params,
          min: v[0],
          max: v[1]
          // group:'default',
        }
      }
    } else if (opt === 'in') {

      p = {
        ...params,
        value: JSON.stringify(v)

      };
    } else {
      let value = v;
      if (cur.type === 'date') {
        value = formatDate(value, 'date');
      }
      p = {
        ...params,
        value

      };
    }
    cur?.formatter?.(p);
    return p;

  })
});

const getOpt = (item = {}) => {
  let {type} = item;
  switch (type) {
    case 'date':
    case 'month':
    case 'dictSelect':
    case 'boolean':
    case 'select':
      return 'eq';
    case 'daterange':
    case 'monthrange':
    case 'datetimerange':
    case 'numrange':
      return 'between';
    default:
      return 'like'

  }
}


const dictSelect = reactive({})
const isSelect = (type) => {
  return ['dictSelect'].includes(type)
};


const initValueArr = computed(() => {
  return props?.items?.map(v => v?.initValue) || []
})

watch(() => initValueArr.value, (n, o) => {
  if (arraysAreEqual(n, o)) return;
  props.items?.forEach(v => {
    if (v.type === 'daterange') {
      queryForm.value[v.field] = [];
    }
    if (v?.initValue) {
      if (v.type === 'dictSelect') {
        queryForm.value[v.field] = v.initValue.id;
        dictSelect[v.field] = v.initValue.name;
      } else {
        queryForm.value[v.field] = v.initValue;

      }
    }
  })

}, {deep: true, immediate: true})

const handleFieldClick = async (item) => {
  if (!isSelect(item.type)) return;
  await createComponent({
    component: await import('@/components/myPopup/index.vue'),
    params: {
      show: true,
      style: {
        height: '60%',
      },
      component: await import('@/components/tree.vue'),
      componentBind: {
        title: item.label,
        selected: queryForm.value[item.field],
        code: item.code,
        onConfirm: (data) => {
          queryForm.value[item.field] = data.id;
          dictSelect[item.field] = data.name;
        }
      }
    }
  })
};

const handleOpenTimePopup = async (item, type) => {
  await createComponent({
    component: await import('@/components/TimePopup/index.vue'),
    params: {
      show: true,
      time: formatDate(dayjs(), `YYYY-MM-DD ${type === 'Start' ? '00:00:00' : '23:59:59'}`),
      popupConfirm: (t) => {
        // dictSelect[item.field + type] = t;
        queryForm.value[item.field][type === 'Start' ? 0 : 1] = t;
      }
    }
  })
}

const handleOpenTimePopup1 = async (item) => {
  await createComponent({
    component: await import('@/components/TimePopup/index.vue'),
    params: {
      show: true,
      showTime: false,
      time: formatDate(queryForm.value[item.field] || dayjs(), `date`),
      popupConfirm: (t) => {
        // dictSelect[item.field + type] = t;
        queryForm.value[item.field] = formatDate(t, 'date');
      }
    }
  })
}


const handleReset = () => {
  queryForm.value = {};
  props.items?.forEach(v => {
    if (getOpt(v) === 'between' && isEmpty(v?.initValue)) {
      queryForm.value[v.prop] = [];
    }
    if (v?.initValue) {
      queryForm.value[v.prop] = v.initValue;
    }
  });
  props.reset?.();
}
const handleConfirm = async () => {
  emits('queryConfirm');
}
onMounted(() => {

})

defineExpose({
  queryItems,
  queryForm
})
</script>

<style lang="scss" scoped>
.header {
  text-align: right;
  font-size: 16px;
  font-weight: 500;
  margin: 5px 30px;
}

.content {
  box-sizing: border-box;
  overflow: auto;
  height: 290px;
}


.footer {
  width: 100%;
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 10px 20px 10px;

  .button {
    padding: 10px 50px;
    border-radius: 16px;
    color: #FFF;
  }

  .reset {
    background-color: #ecb90e;
  }

  .confirm {
    background-color: #1989fa;
  }
}
</style>
