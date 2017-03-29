!function(){var a=Handlebars.template,e=Handlebars.templates=Handlebars.templates||{};e.card=a({compiler:[7,">= 4.0.0"],main:function(a,e,n,l,t){var i;return'<div class="front-card-labels"></div>\n<a class="card-title" href="#">'+a.escapeExpression((i=null!=(i=n.card_name||(null!=e?e.card_name:e))?i:n.helperMissing,"function"==typeof i?i.call(null!=e?e:{},{name:"card_name",hash:{},data:t}):i))+'</a>\n<span class="card-due-date"></span>\n<span class="card-comments-count"></span>\n<a class="card-edit" href="#"></a>\n'},useData:!0}),e.card_extended_modal=a({compiler:[7,">= 4.0.0"],main:function(a,e,n,l,t){var i,s=null!=e?e:{},d=n.helperMissing,c="function",o=a.escapeExpression;return'<div class="card-extended-container">\n  <a class="close" id="close-parent"></a>\n\n  <div class="card-actions-menu">\n    <h3>Add</h3>\n    <ul class="extended-actions">\n      <li id="card-members">Members</li>\n      <li id="card-labels">Labels</li>\n      <li id="card-checklist">Checklist</li>\n      <li id="card-due">Due Date</li>\n      <li id="card-attachment">Attachment</li>\n    </ul>\n    <h3>Actions</h3>\n    <ul class="extended-actions">\n      <li id="card-move">Move</li>\n      <li id="card-copy">Copy</li>\n      <li id="card-subscribe" data-id="'+o((i=null!=(i=n.id||(null!=e?e.id:e))?i:d,typeof i===c?i.call(s,{name:"id",hash:{},data:t}):i))+'">Subscribe<span id="card-subscribe-status"></span></li>\n      <li id="card-archive">Archive</li>\n    </ul>\n  </div>\n\n  <div class="card-info">\n    <input type="text" class="editable-name" value="'+o((i=null!=(i=n.card_name||(null!=e?e.card_name:e))?i:d,typeof i===c?i.call(s,{name:"card_name",hash:{},data:t}):i))+'">\n    <label class="cards-list">in list <span>'+o((i=null!=(i=n.list_name||(null!=e?e.list_name:e))?i:d,typeof i===c?i.call(s,{name:"list_name",hash:{},data:t}):i))+'</span></label>\n    <section id="card-description-view"></section>\n  </div>\n\n  <div class="card-comment-form">\n    <h3>Add Comment</h3>\n    <form action="/comments" method="post" id="new-comment-form">\n      <input type="hidden" name="cardID" value="'+o((i=null!=(i=n.id||(null!=e?e.id:e))?i:d,typeof i===c?i.call(s,{name:"id",hash:{},data:t}):i))+'">\n      <textarea name="newComment" placeholder="Write a comment..."></textarea>\n      <input id="new-comment" class="disabled-submit" type="submit" value="Send">\n    </form>\n  </div>\n\n  <div class="card-comments">\n    <h3>Comments</h3>\n  </div>\n\n  <div class="card-activity">\n  </div>\n</div>\n<div id="second-overlay"></div>\n'},useData:!0}),e.card_name_modal=a({compiler:[7,">= 4.0.0"],main:function(a,e,n,l,t){var i,s=null!=e?e:{},d=n.helperMissing,c="function",o=a.escapeExpression;return'<div class="generic-form" id="edit-modal">\n  <div class="card-labels"></div>\n  <form action="/card/'+o((i=null!=(i=n.card_id||(null!=e?e.card_id:e))?i:d,typeof i===c?i.call(s,{name:"card_id",hash:{},data:t}):i))+'" method="post">\n    <fieldset class="textfield">\n      <textarea name="newCardName">'+o((i=null!=(i=n.card_name||(null!=e?e.card_name:e))?i:d,typeof i===c?i.call(s,{name:"card_name",hash:{},data:t}):i))+'</textarea>\n      <input type="submit" value="Save">\n    </fieldset>\n    <fieldset class="actions">\n      <a href="#" class="edit-labels">Edit Labels</a>\n      <a href="#" class="change-members">Change Members</a>\n      <a href="#" class="move-card">Move</a>\n      <a href="#" class="copy-card">Copy</a>\n      <a href="#" class="change-due-date">Change Due Date</a>\n      <a href="#" class="archive-card">Archive</a>\n    </fieldset>\n  </form>\n</div>\n<div id="overlay"></div>\n'},useData:!0}),e.card_notification=a({compiler:[7,">= 4.0.0"],main:function(a,e,n,l,t){return'<p class="n-description">\n  '+a.escapeExpression((n.createActivityString||e&&e.createActivityString||n.helperMissing).call(null!=e?e:{},null!=e?e.eventData:e,{name:"createActivityString",hash:{},data:t}))+'\n</p>\n<a class="remove-notification" href="#"></a>\n'},useData:!0}),e.card_with_description=a({compiler:[7,">= 4.0.0"],main:function(a,e,n,l,t){var i,s=null!=e?e:{},d=n.helperMissing,c="function",o=a.escapeExpression;return'<div id="description-update-container">\n  <p class="description-form-label">Description</p>\n  <a class="toggle-description-update" href="#">Edit</a>\n  <p class="editable-description">'+o((i=null!=(i=n.description||(null!=e?e.description:e))?i:d,typeof i===c?i.call(s,{name:"description",hash:{},data:t}):i))+'</p>\n</div>\n<form action="/card/'+o((i=null!=(i=n.id||(null!=e?e.id:e))?i:d,typeof i===c?i.call(s,{name:"id",hash:{},data:t}):i))+'" method="post" id="card-description-form">\n  <fieldset>\n    <textarea class="card-description-ta" name="cardDescription">'+o((i=null!=(i=n.description||(null!=e?e.description:e))?i:d,typeof i===c?i.call(s,{name:"description",hash:{},data:t}):i))+'</textarea>\n  </fieldset>\n  <fieldset>\n    <input id="description-save" type="button" value="Save">\n    <a class="close" id="description-close" href="#"></a>\n  </fieldset>\n</form>\n'},useData:!0}),e.card_without_description=a({compiler:[7,">= 4.0.0"],main:function(a,e,n,l,t){var i;return'<a class="toggle-description-edit">Edit the description...</a>\n<form action="/card/'+a.escapeExpression((i=null!=(i=n.id||(null!=e?e.id:e))?i:n.helperMissing,"function"==typeof i?i.call(null!=e?e:{},{name:"id",hash:{},data:t}):i))+'" method="post" id="card-nodescription-form">\n  <fieldset>\n    <textarea class="card-description-ta" name="cardDescription"></textarea>\n  </fieldset>\n  <fieldset>\n    <input id="nodescription-save" type="button" value="Save">\n    <a class="close" id="nodescription-close" href="#"></a>\n  </fieldset>\n</form>\n'},useData:!0}),e.change_date=a({compiler:[7,">= 4.0.0"],main:function(a,e,n,l,t){return'<div class="generic-form" id="date-modal">\n  <form action="/change_date" method="post">\n    <a class="close"></a>\n    <h3 class="actions-header">Change Due Date</h3>\n    <fieldset>\n      <input type="text" id="datetimepicker" name="newDate">\n    </fieldset>\n\n    <fieldset>\n      <input type="submit" value="Save">\n      <input type="button" value="Reset">\n    </fieldset>\n  </form>\n</div>\n<div id="third-overlay"></div>\n'},useData:!0}),e.comment=a({compiler:[7,">= 4.0.0"],main:function(a,e,n,l,t){var i,s=null!=e?e:{},d=n.helperMissing,c="function",o=a.escapeExpression;return'<div class="card-comment" id="'+o((i=null!=(i=n.id||(null!=e?e.id:e))?i:d,typeof i===c?i.call(s,{name:"id",hash:{},data:t}):i))+'">\n  <h4>By '+o((i=null!=(i=n.comment_author||(null!=e?e.comment_author:e))?i:d,typeof i===c?i.call(s,{name:"comment_author",hash:{},data:t}):i))+'</h4>\n  <p class="comment-body">'+o((i=null!=(i=n.comment_body||(null!=e?e.comment_body:e))?i:d,typeof i===c?i.call(s,{name:"comment_body",hash:{},data:t}):i))+'</p>\n  <p class="comment-date">Posted on '+o((i=null!=(i=n.date_created||(null!=e?e.date_created:e))?i:d,typeof i===c?i.call(s,{name:"date_created",hash:{},data:t}):i))+'</p>\n  <a href="#" id="edit-comment">Edit</a>\n  <span>-</span>\n  <a href="#" id="delete-comment">Delete</a>\n</div>\n<div class="comment-edit-form">\n  <form action="/comment/'+o((i=null!=(i=n.id||(null!=e?e.id:e))?i:d,typeof i===c?i.call(s,{name:"id",hash:{},data:t}):i))+'" method="post">\n    <input type="hidden" name="commentID" value="'+o((i=null!=(i=n.id||(null!=e?e.id:e))?i:d,typeof i===c?i.call(s,{name:"id",hash:{},data:t}):i))+'">\n    <textarea name="editComment" placeholder="Edit your comment...">'+o((i=null!=(i=n.comment_body||(null!=e?e.comment_body:e))?i:d,typeof i===c?i.call(s,{name:"comment_body",hash:{},data:t}):i))+'</textarea>\n    <input id="edit-comment-submit" type="submit" value="Save">\n  </form>\n</div>\n\n'},useData:!0}),e.copy_card_modal=a({1:function(a,e,n,l,t){var i,s=null!=e?e:{},d=n.helperMissing,c="function",o=a.escapeExpression;return'        <textarea name="cardName" autofocus>'+o((i=null!=(i=n.card_name||(null!=e?e.card_name:e))?i:d,typeof i===c?i.call(s,{name:"card_name",hash:{},data:t}):i))+'</textarea>\n        <input type="hidden" name="cardID" value="'+o((i=null!=(i=n.id||(null!=e?e.id:e))?i:d,typeof i===c?i.call(s,{name:"id",hash:{},data:t}):i))+'">\n        <input type="hidden" name="description" value="'+o((i=null!=(i=n.description||(null!=e?e.description:e))?i:d,typeof i===c?i.call(s,{name:"description",hash:{},data:t}):i))+'">\n        <input type="hidden" name="dueDate" value="'+o((i=null!=(i=n.due_date||(null!=e?e.due_date:e))?i:d,typeof i===c?i.call(s,{name:"due_date",hash:{},data:t}):i))+'">\n        <input type="hidden" name="dueTime" value="'+o((i=null!=(i=n.due_time||(null!=e?e.due_time:e))?i:d,typeof i===c?i.call(s,{name:"due_time",hash:{},data:t}):i))+'">\n'},3:function(a,e,n,l,t){var i,s=null!=e?e:{};return null!=(i=n.if.call(s,(n.sameNames||e&&e.sameNames||n.helperMissing).call(s,null!=e?e.listName:e,null!=e?e.thisListName:e,{name:"sameNames",hash:{},data:t}),{name:"if",hash:{},fn:a.program(4,t,0),inverse:a.program(6,t,0),data:t}))?i:""},4:function(a,e,n,l,t){var i,s=null!=e?e:{},d=n.helperMissing,c="function",o=a.escapeExpression;return'            <option value="'+o((i=null!=(i=n.listID||(null!=e?e.listID:e))?i:d,typeof i===c?i.call(s,{name:"listID",hash:{},data:t}):i))+'" selected>'+o((i=null!=(i=n.listName||(null!=e?e.listName:e))?i:d,typeof i===c?i.call(s,{name:"listName",hash:{},data:t}):i))+" (current)</option>\n"},6:function(a,e,n,l,t){var i,s=null!=e?e:{},d=n.helperMissing,c="function",o=a.escapeExpression;return'            <option value="'+o((i=null!=(i=n.listID||(null!=e?e.listID:e))?i:d,typeof i===c?i.call(s,{name:"listID",hash:{},data:t}):i))+'">'+o((i=null!=(i=n.listName||(null!=e?e.listName:e))?i:d,typeof i===c?i.call(s,{name:"listName",hash:{},data:t}):i))+"</option>\n"},compiler:[7,">= 4.0.0"],main:function(a,e,n,l,t){var i,s=null!=e?e:{};return'<div class="generic-form" id="copy-modal">\n  <form action="/copy_card" method="post">\n    <h3 class="actions-header">Copy Card</h3>\n    <fieldset>\n      <label>Title</label>\n'+(null!=(i=n.with.call(s,null!=e?e.card:e,{name:"with",hash:{},fn:a.program(1,t,0),inverse:a.noop,data:t}))?i:"")+'    </fieldset>\n\n    <fieldset>\n      <label>Copy to...</label>\n      <select class="copy-to-board" name="toBoard">\n        <option selected>Board 1</option>\n      </select>\n      <select class="copy-to-list" name="toList">\n'+(null!=(i=n.each.call(s,null!=e?e.lists:e,{name:"each",hash:{},fn:a.program(3,t,0),inverse:a.noop,data:t}))?i:"")+'      </select><!--\n      --><select class="copy-to-position" name="toPosition">\n      </select>\n    </fieldset>\n    <fieldset>\n      <input type="submit" value="Create Card">\n    </fieldset>\n  </form>\n</div>\n<div id="third-overlay"></div>\n'},useData:!0}),e.edit_labels_modal=a({compiler:[7,">= 4.0.0"],main:function(a,e,n,l,t){var i=null!=e?e:{},s=n.helperMissing,d=a.escapeExpression;return'<div id="labels-modal">\n  <a class="close"></a>\n  <h3 class="actions-header">Labels</h3>\n  <input type="search" name="label-search" placeholder="Search labels..." autofocus>\n  <ul class="label-colors">\n    <li class="label-color color-red" data-color="red">\n      <span class="'+d((n.labelUsed||e&&e.labelUsed||s).call(i,null!=e?e.red:e,{name:"labelUsed",hash:{},data:t}))+'"></span>\n    </li>\n    <li class="label-color color-blue" data-color="blue">\n      <span class="'+d((n.labelUsed||e&&e.labelUsed||s).call(i,null!=e?e.blue:e,{name:"labelUsed",hash:{},data:t}))+'"></span>\n    </li>\n    <li class="label-color color-green" data-color="green">\n      <span class="'+d((n.labelUsed||e&&e.labelUsed||s).call(i,null!=e?e.green:e,{name:"labelUsed",hash:{},data:t}))+'"></span>\n    </li>\n    <li class="label-color color-purple" data-color="purple">\n      <span class="'+d((n.labelUsed||e&&e.labelUsed||s).call(i,null!=e?e.purple:e,{name:"labelUsed",hash:{},data:t}))+'"></span>\n    </li>\n    <li class="label-color color-yellow" data-color="yellow">\n      <span class="'+d((n.labelUsed||e&&e.labelUsed||s).call(i,null!=e?e.yellow:e,{name:"labelUsed",hash:{},data:t}))+'"></span>\n    </li>\n    <li class="label-color color-orange" data-color="orange">\n      <span class="'+d((n.labelUsed||e&&e.labelUsed||s).call(i,null!=e?e.orange:e,{name:"labelUsed",hash:{},data:t}))+'"></span>\n    </li>\n    <li class="label-color color-black" data-color="black">\n      <span class="'+d((n.labelUsed||e&&e.labelUsed||s).call(i,null!=e?e.black:e,{name:"labelUsed",hash:{},data:t}))+'"></span>\n    </li>\n  </ul>\n</div>\n<div id="third-overlay"></div>\n'},useData:!0}),e.found_card=a({compiler:[7,">= 4.0.0"],main:function(a,e,n,l,t){var i,s=null!=e?e:{},d=n.helperMissing,c="function",o=a.escapeExpression;return'<ul class="found-card-info">\n  <li>Card name: '+o((i=null!=(i=n.card_name||(null!=e?e.card_name:e))?i:d,typeof i===c?i.call(s,{name:"card_name",hash:{},data:t}):i))+"</li>\n  <li>In list: "+o((i=null!=(i=n.list_name||(null!=e?e.list_name:e))?i:d,typeof i===c?i.call(s,{name:"list_name",hash:{},data:t}):i))+"</li>\n  <li>Date create: "+o((i=null!=(i=n.date_created||(null!=e?e.date_created:e))?i:d,typeof i===c?i.call(s,{name:"date_created",hash:{},data:t}):i))+"</li>\n</ul>\n"},useData:!0}),e.list_actions=a({compiler:[7,">= 4.0.0"],main:function(a,e,n,l,t){return'<div>\n  <a class="close"></a>\n  <h3 class="actions-header">List Actions</h3>\n</div>\n<div>\n  <a class="list-action add-card" href="#">Add Card...</a>\n  <a class="list-action copy-list" href="#">Copy List...</a>\n  <a class="list-action move-list" href="#">Move List...</a>\n  <a class="list-action subscribe" href="#">Subscribe</a>\n</div>\n<div class="mass-list-actions">\n  <a class="list-action move-all" href="#">Move All Cards in This List</a>\n  <a class="list-action archive-all" href="#">Archive All Cards in This List</a>\n</div>\n<div>\n  <a class="list-action archive-list" href="#">Archive This List</a>\n</div>\n'},useData:!0}),e.list_positions=a({compiler:[7,">= 4.0.0"],main:function(a,e,n,l,t){return""},useData:!0}),e.list_view=a({compiler:[7,">= 4.0.0"],main:function(a,e,n,l,t){var i,s=null!=e?e:{},d=n.helperMissing,c="function",o=a.escapeExpression;return'<input type="text" name="list-'+o((i=null!=(i=n.id||(null!=e?e.id:e))?i:d,typeof i===c?i.call(s,{name:"id",hash:{},data:t}):i))+'" value="'+o((i=null!=(i=n.list_name||(null!=e?e.list_name:e))?i:d,typeof i===c?i.call(s,{name:"list_name",hash:{},data:t}):i))+'">\n<a class="list-actions" href="#">...</a>\n<div data-id="'+o((i=null!=(i=n.id||(null!=e?e.id:e))?i:d,typeof i===c?i.call(s,{name:"id",hash:{},data:t}):i))+'" class="list-body">\n</div>\n<a class="add-card" href="#">Add a card</a>\n'},useData:!0}),e.move_card_modal=a({1:function(a,e,n,l,t){var i,s=null!=e?e:{},d=n.helperMissing,c="function",o=a.escapeExpression;return'        <input type="hidden" name="cardID" value="'+o((i=null!=(i=n.id||(null!=e?e.id:e))?i:d,typeof i===c?i.call(s,{name:"id",hash:{},data:t}):i))+'">\n        <input type="hidden" name="description" value="'+o((i=null!=(i=n.description||(null!=e?e.description:e))?i:d,typeof i===c?i.call(s,{name:"description",hash:{},data:t}):i))+'">\n        <input type="hidden" name="dueDate" value="'+o((i=null!=(i=n.due_date||(null!=e?e.due_date:e))?i:d,typeof i===c?i.call(s,{name:"due_date",hash:{},data:t}):i))+'">\n        <input type="hidden" name="listID" value="'+o((i=null!=(i=n.list_id||(null!=e?e.list_id:e))?i:d,typeof i===c?i.call(s,{name:"list_id",hash:{},data:t}):i))+'">\n'},3:function(a,e,n,l,t){var i,s=null!=e?e:{};return null!=(i=n.if.call(s,(n.sameNames||e&&e.sameNames||n.helperMissing).call(s,null!=e?e.listName:e,null!=e?e.thisListName:e,{name:"sameNames",hash:{},data:t}),{name:"if",hash:{},fn:a.program(4,t,0),inverse:a.program(6,t,0),data:t}))?i:""},4:function(a,e,n,l,t){var i,s=null!=e?e:{},d=n.helperMissing,c="function",o=a.escapeExpression;return'            <option value="'+o((i=null!=(i=n.listID||(null!=e?e.listID:e))?i:d,typeof i===c?i.call(s,{name:"listID",hash:{},data:t}):i))+'" selected>'+o((i=null!=(i=n.listName||(null!=e?e.listName:e))?i:d,typeof i===c?i.call(s,{name:"listName",hash:{},data:t}):i))+" (current)</option>\n"},6:function(a,e,n,l,t){var i,s=null!=e?e:{},d=n.helperMissing,c="function",o=a.escapeExpression;return'            <option value="'+o((i=null!=(i=n.listID||(null!=e?e.listID:e))?i:d,typeof i===c?i.call(s,{name:"listID",hash:{},data:t}):i))+'">'+o((i=null!=(i=n.listName||(null!=e?e.listName:e))?i:d,typeof i===c?i.call(s,{name:"listName",hash:{},data:t}):i))+"</option>\n"},compiler:[7,">= 4.0.0"],main:function(a,e,n,l,t){var i,s=null!=e?e:{};return'<div class="generic-form" id="move-modal">\n  <form action="/move_card" method="post">\n    <h3 class="actions-header">Move Card</h3>\n    <fieldset>\n'+(null!=(i=n.with.call(s,null!=e?e.card:e,{name:"with",hash:{},fn:a.program(1,t,0),inverse:a.noop,data:t}))?i:"")+'    </fieldset>\n\n    <fieldset>\n      <select class="move-to-board" name="toBoard">\n        <option selected>Board 1</option>\n      </select>\n      <select class="move-to-list" name="toList">\n'+(null!=(i=n.each.call(s,null!=e?e.lists:e,{name:"each",hash:{},fn:a.program(3,t,0),inverse:a.noop,data:t}))?i:"")+'      </select><!--\n      --><select class="copy-to-position" name="toPosition">\n      </select>\n    </fieldset>\n    <fieldset>\n      <input type="submit" value="Move">\n    </fieldset>\n  </form>\n</div>\n<div id="third-overlay"></div>\n'},useData:!0}),e.new_card_form=a({1:function(a,e,n,l,t){var i;return'      <input type="hidden" name="listID" value="'+a.escapeExpression((i=null!=(i=n.id||(null!=e?e.id:e))?i:n.helperMissing,"function"==typeof i?i.call(null!=e?e:{},{name:"id",hash:{},data:t}):i))+'">\n'},compiler:[7,">= 4.0.0"],main:function(a,e,n,l,t){var i,s,d=null!=e?e:{};return'<form method="post" action="/cards">\n  <fieldset>\n'+(null!=(i=n.with.call(d,null!=e?e.list:e,{name:"with",hash:{},fn:a.program(1,t,0),inverse:a.noop,data:t}))?i:"")+'    <input type="hidden" name="position" value="'+a.escapeExpression((s=null!=(s=n.position||(null!=e?e.position:e))?s:n.helperMissing,"function"==typeof s?s.call(d,{name:"position",hash:{},data:t}):s))+'">\n    <textarea name="cardName" autofocus></textarea>\n    <input type="submit" value="Add">\n    <a class="close" href="#"></a>\n  </fieldset>\n</form>\n'},useData:!0}),e.new_list_form=a({compiler:[7,">= 4.0.0"],main:function(a,e,n,l,t){return'<form method="post" action="/lists">\n  <fieldset>\n    <input type="text" name="listName" placeholder="Add a list" autofocus>\n    <input type="submit" value="Save">\n    <a href="#"></a>\n  </fieldset>\n</form>\n<span class="placeholder-new-list">Add a list</span>\n'},useData:!0}),e.top_menu=a({compiler:[7,">= 4.0.0"],main:function(a,e,n,l,t){return'<div id="nav">\n  <li>\n    <a id="boards-button" class="nav-button" href="#">Boards</a>\n  </li>\n  <li>\n    <input id="card-search" class="nav-button" type="search" placeholder="Search">\n  </li>\n  <li id="logo"></li>\n  <li class="right-submenu">\n    <a id="board-notifications" class="nav-button" href="#"></a>\n  </li>\n  <li class="right-submenu">\n    <a id="account-board-button" class="nav-button" href="#"></a>\n  </li>\n  <li class="right-submenu">\n    <a id="new-board-button" class="nav-button" href="#"></a>\n  </li>\n</div>\n<div id="search-results">\n</div>\n<div id="notifications">\n  <a class="close" id="notifications-close"></a>\n</div>\n'},useData:!0})}();