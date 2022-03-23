const BASE_URL = 'http://localhost:3030/'

const API = {
  LOGIN: {
    LOGIN_ACTION: BASE_URL + 'admin/login_action',
    LOGIN_CHECK: BASE_URL + 'admin/login_check',
    LOGOUT_ACTION: BASE_URL + 'admin/logout_action'
  },
  COURSE: {
    GET_COURSES_DATA: BASE_URL + 'get_courses_data',
    UPDATE_COURSE_FIELD: BASE_URL + 'update_course_field'
  },
  RECOM_COURSE: {
    GET_COURSES_DATA: BASE_URL + 'get_recom_courses_data'
  },
  SLIDER: {
    GET_SLIDERS_DATA: BASE_URL + 'get_sliders_data'
  },
  COLLECTION: {
    GET_COLLECTION_DATA: BASE_URL + 'get_collections_data'
  },
  TEACHER: {
    GET_TEACHERS_DATA: BASE_URL + 'get_teachers_data',
    UPDATE_TEACHER_STAR: BASE_URL + 'update_teacher_star'
  },
  STUDENT: {
    GET_STUDENTS_DATA: BASE_URL + 'get_students_data'
  },
  COMMON: {
    UPDATE_ROW_STATUS: BASE_URL + 'update_status'
  },
  CRAWLER: {
    CRAWL_ACTION: BASE_URL + 'crawler/crawl_action'
  }
}

const NAV = [
  {
    field: 'course',
    title: '课程管理' //课程上下架，课程分类选择
  },
  {
    field: 'recom_course',
    title: '推荐课程' //推荐课程上下架
  },
  {
    field: 'slider',
    title: '轮播图数据' //轮播图数据上下线
  },
  {
    field: 'collection',
    title: '课程集合管理' //课程集合的上下线
  },
  {
    field: 'teacher',
    title: '老师管理' // 老师的上下线 明星老师的设置
  },
  {
    field: 'student',
    title: '学生管理' // 学生的上下线
  },
  {
    field: 'crawler',
    title: '数据爬取'
  }
]

export { API, NAV }
