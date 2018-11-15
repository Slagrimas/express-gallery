exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('gallery').del()
    .then(function () {
      return knex('gallery').insert([
        { author: 'shadr', link:'http://speedhunters-wp-production.s3.amazonaws.com/wp-content/uploads/2014/11/05170023/larry_chen_speedhunters_liberty_walk_lamborghini_aventador-1.jpg', description: 'Lambo Aventador', author_id: 2},
        { author: 'shadrach', link:'https://wallpapercave.com/wp/wp2499906.jpg', description: 'BMW m4', author_id: 1},
        { author: 'lagrimas', link:'https://i1.wp.com/www.rightfootdown.com/wp-content/uploads/2015/03/ferrari-458-spider-liberty-walk-9.jpg', description: 'Ferrari 458 Spider', author_id: 3},
        { author: 'shadrach', link:'//http://hdqwalls.com/wallpapers/mclaren-p1-supercar.jpg', description: 'Mclaren p1', author_id: 1},
        { author: 'shadr', link:'http://www.hdcarwallpapers.com/walls/2016_audi_r8_4k-HD.jpg', description: 'Audi R8', author_id: 2}
      ]);
    });
 };
