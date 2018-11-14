exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('gallery').del()
    .then(function () {
      // Inserts seed entries
      return knex('gallery').insert([
        { author: 'Shadrach', link:'https://besthqwallpapers.com/Uploads/26-6-2018/57003/thumb2-4k-toyota-tacoma-trd-pro-tuning-2019-cars-offroad.jpg', description: 'Toyota Tacoma Trd Pro'},
        { author: 'Shadr', link:'https://i.pinimg.com/originals/4a/8a/fc/4a8afcc7977e162ff2b38b08547c42c3.png', description: 'Ford F-250'},
        { author: 'jenn', link:'http://cacsw.org/wp-content/uploads/2018/04/2019-Ram-1500-VLP-2019-Dodge-Ram-off-road-sunset-beautiful-hills-background-4k-hd-wallpaper.jpg', description: 'Dodge Ram 1500 VLP'},
        { author: 'jenn', link:'http://cacsw.org/wp-content/uploads/2017/10/2019-Nissan-Frontier-black-color-with-roof-rails-off-road-hd-wallpaper.jpg', description: 'Nissan Frontier Pro'},
        { author: 'shadr', link:'http://www.hdcarwallpapers.com/walls/2016_nissan_titan_warrior_concept-wide.jpg', description: 'Nissan Titan'},
        { author: 'shadG', link:'http://www.hdcarwallpapers.com/walls/2019_toyota_tundra_trd_pro_crewmax_4k-HD.jpg', description: 'Toyota Tundra Trd Pro'},
        { author: 'shadG', link:'http://wallpaperevo.com/wp-content/uploads/2016/01/Black-Ford-Raptor-4K-UHD-Wallpaper-806x537.jpg', description: 'Ford Raptor'}
      ]);
    });
 };
