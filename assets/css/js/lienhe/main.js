const tabs = document.querySelectorAll('.faq-tabs li')
const lists = document.querySelectorAll('.faq-list')

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    // Xóa active cũ
    tabs.forEach(t => t.classList.remove('active'))
    lists.forEach(l => l.classList.remove('active'))
    // Thêm active mới
    tab.classList.add('active')
    document.getElementById(tab.dataset.tab).classList.add('active')
  })
})
