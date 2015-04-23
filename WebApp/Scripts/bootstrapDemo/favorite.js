$(function () {
    var sectionlistNode = $('#sectionList');
    var sectionListDetail = $('#sectionListDetail')

    var marks = [
            {
                id: 'basic', title: 'Basic',
                section: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam eu sem tempor, varius quam at, luctus dui. Mauris magna metus, dapibus nec turpis vel, semper malesuada ante. Vestibulum id metus ac nisl bibendum scelerisque non non purus. Suspendisse varius nibh non aliquet sagittis. In tincidunt orci sit amet elementum vestibulum. Vivamus fermentum in arcu in aliquam. Quisque aliquam porta odio in fringilla. Vivamus nisl leo, blandit at bibendum eu, tristique eget risus. Integer aliquet quam ut elit suscipit, id interdum neque porttitor. Integer faucibus ligula.'
            },
            { id: 'future', title: 'Future', section: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam eu sem tempor, varius quam at, luctus dui. Mauris magna metus, dapibus nec turpis vel, semper malesuada ante. Vestibulum id metus ac nisl bibendum scelerisque non non purus. Suspendisse varius nibh non aliquet sagittis. In tincidunt orci sit amet elementum vestibulum. Vivamus fermentum in arcu in aliquam. Quisque aliquam porta odio in fringilla. Vivamus nisl leo, blandit at bibendum eu, tristique eget risus. Integer aliquet quam ut elit suscipit, id interdum neque porttitor. Integer faucibus ligula.' },
            { id: 'myself', title: 'Myself', section: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam eu sem tempor, varius quam at, luctus dui. Mauris magna metus, dapibus nec turpis vel, semper malesuada ante. Vestibulum id metus ac nisl bibendum scelerisque non non purus. Suspendisse varius nibh non aliquet sagittis. In tincidunt orci sit amet elementum vestibulum. Vivamus fermentum in arcu in aliquam. Quisque aliquam porta odio in fringilla. Vivamus nisl leo, blandit at bibendum eu, tristique eget risus. Integer aliquet quam ut elit suscipit, id interdum neque porttitor. Integer faucibus ligula.' }
    ];
    bindingData(sectionlistNode, sectionListDetail, marks);
});

function bindingData(node, sectionListDetail, marks) {
    if (marks) {
        for (var mindex = 0; mindex < marks.length; mindex++) {
            var mark = marks[mindex];
            var id = mark.id;
            var title = mark.title;

            var sid = 's-' + id;
            var sectiontitle = '<li><a href="#' + sid + '">' + title + '</a></li>';
            $(sectiontitle).appendTo(node);
            var section = '<h2 id="' + sid + '">' + title + '</h2>';
            section += mark.section;
            section += '<hr>';
            $(section).appendTo(sectionListDetail);
        }
    }
}