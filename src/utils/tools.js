function trimSpace(str) {
  return str.replace(/\s+/g, '')
}

function getDatas(res, navigate) {
  const { err_code, err_msg, data } = res
  return new Promise((resolve, reject) => {
    if (err_code === 10006) {
      navigate('/login')
      reject(err_msg)
      return
    }
    if (err_code === 0 && data) {
      resolve(data)
    } else {
      navigate('/error')
      reject(err_msg)
    }
  })
}

function confirmText(field) {
  return function (status) {
    switch (field) {
      case 'COLLECTION':
        return `确认要${status ? '下架' : '上架'}该集合吗？`
      case 'COURSE':
        return `确认要${status ? '下架' : '上架'}该课程吗？`
      case 'RECOM_COURSE':
        return `确认要${status ? '下架' : '上架'}该推荐课程吗？`
      case 'SLIDER':
        return `确认要${status ? '下架' : '上架'}该轮播图吗？`
      case 'STUDENT':
        return `确认要${status ? '下线' : '上线'}该学生吗？`
      case 'TEACHER':
        return `确认要${status ? '下线' : '上线'}该老师吗？`
      case 'STAR_TEACHER':
        return `确认要设置该老师为${status ? '非明星' : '明星'}老师吗？`
      default:
        return `field参数有问题`
    }
  }
}
export { trimSpace, getDatas, confirmText }
