// TODO - Set up a database
var projects = [
    {
        id: '1',
        title: 'Boys and Girls Club of America',
        summary: 'Spend time playing games and doing activities with the kids at the Boys & Girls Club.',
        logo: 'images/Logos/boysgirlsclublogo_orig.jpg',
        who: "Every Friday, Circle K'ers volunteer at the Boys & Girls Club, inspiring and enabling all young people to realize their full potential as productive, responsible, and caring citizens. The organization provides a safe place to learn and grow, and volunteers can play games with children.",
        what: "If you volunteer at the Boys & Girls Club, you can pick from a variety of activities. You can play boardgames, blocks, and other indoor activities. There is also a craft time where you can help out the children. You can also play sports in the gym or outside (weather-permitting) such as basketball.",
        details: {
            location: "The Bellwood Boys & Girls Club",
            address: "777 Donald Lee Hollowell Pkwy NW, Atlanta, GA 30318",
            time: "Fridays, 4:20 - 6:00 pm (Meet at 4:05 pm)",
            pickup: "Pickup @ CULC Circle",
            dress: "If you want to play sports, wear clothes to run around in. If you plan to do crafts/blocks/etc, wear casual clothing. No inappropriate clothing (you will be around children)."
        },
        link: "https://docs.google.com/forms/d/e/1FAIpQLScFVp8j3mjXGZ0r7lBuKX9JvkgGID_60eJOHfBAse_zt6QCkA/viewform",
        extra: "Please try to arrive 15 minutes before the event (by 4:05 pm). This is the roundabout outside the back entrance of the CULC. Please contact us if you can't make it here in time, and we'll try to accommodate you.",
        imagePath: '/images/Pictures/boysAndGirls/',
        images: ['20170908-171205_orig.jpg', '20171006-172424_orig.jpg', 'b4-dj-got-beat-by-kijana_orig.jpg', 'img-2090_orig.jpg', 'img-2094_orig.jpg', 'img-2123_orig.jpg', 'img-2126_orig.jpg', 'img-2256_orig.jpg', 'img-2258_orig.jpg', 'img-2261_orig.jpg', 'IMG_9239.jpg', 'IMG_9242.JPG', 'IMG_9280.jpg', 'kijana-has-no-chill_orig.jpg', 'left_orig.jpg', 'mid_orig.jpg', 'right_orig.jpg']
    },
    {
        id: '2',
        title: 'Atlanta Community Food Bank',
        summary: 'Come help sort goods and food for distribution to families in need.​',
        logo: 'images/Logos/foodbank_orig.png',
        who: "Alternating Tuesdays and Wednesday every week, Circkle K'ers volunteer on-location for the Atlanta Community Foodbank. This organization strives to provide nutritious food for those in need, and relies on a network of volunteers to realize this goal.",
        what: "Volunteers will participate in sorting and packaging food to be distributed to families in need. Make sure to wear close-toed shoes!",
        details: {
            location: "Atlanta Community Food Bank Warehouse",
            address: "732 Joseph Lowery Blvd. NW, Atlanta, GA 30318",
            time: "Currently on hold",
            pickup: "Pickup @ CULC Circle",
            dress: "Closed toed shoes"
        },
        extra: "***Currently on hold",
        imagePath: '/images/Pictures/foodbank/',
        images: ['img-0020-fotor_orig.jpg', 'img-2200_orig.jpg', 'img-2235_orig.jpg', 'img-2236_orig.jpg', 'img-2240_orig.jpg', 'img-4456-fotor_orig.jpg', 'IMG_5648.JPG', 'the-face-marisa-makes-when-she-sees-someone-she-knows_orig.jpg']
    },
    {
        id: '3',
        title: 'Kiwanis Luncheons',
        summary: 'Attend the Kiwanis luncheon: meet members from our sponsoring Kiwanis club, enjoy lunch, and hear from a guest speaker.',
        logo: 'images/Logos/kiwanis-logo.jpg',
        details: {
            location: "Second-Ponce de Leon Baptist Church",
            address: "2715 Peachtree Rd. NE, Atlanta, GA 30305",
            time: "Thursdays, 12:00 - 2:00 pm",
            pickup: "Pickup TBD (we will contact you)",
            dress: "You don't need to \"dress up\" but don't wear a t-shirt, flip flops, or any inappropriate clothing."
        },
        extra: "Contact Izah Tahir (itahir3@gatech.edu) to sign up.",
        imagePath: '/images/Pictures/kiwanisLunch/',
        images: ['IMG_0235.JPG', 'IMG_0253.JPG', 'IMG_0255.JPG', 'IMG_0496.JPG', 'IMG_0853.JPG', 'IMG_0854.JPG', 'IMG_0873.JPG', 'IMG_1660.JPG', 'IMG_1662.JPG', 'IMG_1667.JPG', 'IMG_1679.JPG', 'IMG_1682.JPG', 'IMG_1692.JPG', 'IMG_1696.JPG']
    },
    {
        id: '4',
        title: 'Trees Atlanta',
        summary: 'Plant trees and ferns around Atlanta neighborhoods and parks.',
        logo: 'images/Logos/treesAtlanta.png',        
        who: "Founded in 1985, Trees Atlanta works tirelessly to address Atlanta’s tree loss, protect its forests, and create new green space. Empowered by its wonderful community of volunteers, Trees Atlanta serves the metro Atlanta area, and has grown to become one of Atlanta’s most widely known and supported non-profit organizations. Our mission statement: Trees Atlanta is a nationally recognized citizens group that protects and improves Atlanta’s urban forest by planting, conserving, and educating.",
        details: {
            // location: "The Bellwood Boys & Girls Club",
            address: "TBD",
            time: "TBD",
            pickup: "Pickup @ CULC Circle",
            dress: "Wear clothing that can get dirty and close-toed shoes. Gloves and equipment will be provided."
        },
        link: "https://docs.google.com/forms/d/e/1FAIpQLSfmWQoVcDLZ_A6JDdVv3s3VGBFCY9V0iGlBOlxc5Cz6bbCihw/viewform",
        extra: "Please try to arrive 15 minutes before the event (by 4:05 pm). This is the roundabout outside the back entrance of the CULC. Please contact us if you can't make it here in time, and we'll try to accommodate you.",
        imagePath: '/images/Pictures/treesAtlanta/',
        images: ['b4-pic-forgot-after-pic_orig.jpg', 'img-2165_orig.jpg', 'img-2167_orig.jpg', 'img-2168_orig.jpg', 'img-2177_orig.jpg', 'img-2181_orig.jpg', 'img-2377_orig.jpg', 'IMG_0222.JPG', 'IMG_0624.JPG', 'IMG_0627.JPG', 'IMG_0629.JPG', 'IMG_0633.JPG', 'IMG_0635.JPG', 'IMG_0637.JPG', 'IMG_0645.JPG', 'IMG_0648.JPG', 'IMG_0650.JPG', 'IMG_0652.JPG', 'IMG_0654.JPG', 'IMG_0657.JPG', 'IMG_0658.JPG', 'trees1_orig.jpg', 'trees3_orig.jpg', 'wormm_orig.jpg']
    },
];

module.exports = projects;

