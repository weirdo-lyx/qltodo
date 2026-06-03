Component({
  data: {
    selected: 0,
    list: [
      {
        pagePath: '/pages/index/index',
        text: '今日',
        image: '/assets/bears/bubu-yier-field.jpeg',
        accent: 'accent-peach',
      },
      {
        pagePath: '/pages/plans/index',
        text: '小窝',
        image: '/assets/bears/72ddba9eab32e8abcb3c565df7ef0734.jpg',
        accent: 'accent-cream',
      },
      {
        pagePath: '/pages/points/index',
        text: '糖罐',
        image: '/assets/bears/2576ebd3f638696674dad516370ddd79.jpg',
        accent: 'accent-mint',
      },
      {
        pagePath: '/pages/profile/index',
        text: '我的',
        image: '/assets/bears/bubu-hoodie.jpeg',
        accent: 'accent-pink',
      },
    ],
  },

  methods: {
    switchTab(event) {
      const { path, index } = event.currentTarget.dataset || {};

      if (!path || Number(index) === this.data.selected) {
        return;
      }

      wx.switchTab({
        url: path,
      });
    },
  },
});
