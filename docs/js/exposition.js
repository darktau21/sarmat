"use strict";function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _defineProperties(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function _createClass(e,t,i){return t&&_defineProperties(e.prototype,t),i&&_defineProperties(e,i),Object.defineProperty(e,"prototype",{writable:!1}),e}var Exposition=function(){function e(t){var i=t.articlesSelector,n=t.linksSelector,s=t.articleActiveClass,a=t.linkActiveClass;_classCallCheck(this,e),this.articles=document.querySelectorAll(".".concat(i)),this.links=document.querySelectorAll(".".concat(n)),this.articleActiveClass=s,this.linkActiveClass=a,this.urlString,this.urlParams,this.currentPage}return _createClass(e,[{key:"getUrlString",value:function(){this.urlString=document.location.search}},{key:"getUrlParams",value:function(){this.urlParams=new URLSearchParams(this.urlString)}},{key:"getCurrentPage",value:function(){this.currentPage=this.urlParams.get("page")}},{key:"changeArticle",value:function(){var e=this;this.getUrlString(),this.getUrlParams(),this.getCurrentPage(),this.articles.forEach((function(t){t.classList.remove(e.articleActiveClass),t.dataset.name==e.currentPage&&t.classList.add(e.articleActiveClass)}))}},{key:"changeActiveLink",value:function(){var e=this;this.links.forEach((function(t){t.classList.remove(e.linkActiveClass),t.dataset.name==e.currentPage&&t.classList.add(e.linkActiveClass)}))}},{key:"setLinksListeners",value:function(){var e=this;this.links.forEach((function(t){t.addEventListener("click",(function(){history.pushState(null,null,t.dataset.article),e.changeArticle(),e.changeActiveLink(),window.scrollTo(0,0)}))}))}},{key:"init",value:function(){this.getUrlString(),this.getUrlParams(),this.getCurrentPage(),this.changeArticle(),this.changeActiveLink(),this.setLinksListeners()}}]),e}();document.addEventListener("DOMContentLoaded",(function(){new Exposition({articlesSelector:"js_article",linksSelector:"js_article-link",articleActiveClass:"exposition__article_active",linkActiveClass:"sub-menu__item_active"}).init()}));
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImV4cG9zaXRpb24uanMiXSwibmFtZXMiOlsiRXhwb3NpdGlvbiIsIl9yZWYiLCJhcnRpY2xlc1NlbGVjdG9yIiwibGlua3NTZWxlY3RvciIsImFydGljbGVBY3RpdmVDbGFzcyIsImxpbmtBY3RpdmVDbGFzcyIsIl9jbGFzc0NhbGxDaGVjayIsInRoaXMiLCJhcnRpY2xlcyIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvckFsbCIsImNvbmNhdCIsImxpbmtzIiwidXJsU3RyaW5nIiwibG9jYXRpb24iLCJzZWFyY2giLCJjdXJyZW50UGFnZSIsInVybFBhcmFtcyIsImdldCIsIl90aGlzIiwiZ2V0VXJsU3RyaW5nIiwiZ2V0VXJsUGFyYW1zIiwiZ2V0Q3VycmVudFBhZ2UiLCJmb3JFYWNoIiwiYXJ0aWNsZSIsImNsYXNzTGlzdCIsInJlbW92ZSIsImRhdGFzZXQiLCJuYW1lIiwiYWRkIiwiX3RoaXMyIiwibGluayIsIl90aGlzMyIsImNoYW5nZUFydGljbGUiLCJzZXRMaW5rc0xpc3RlbmVycyIsImFkZEV2ZW50TGlzdGVuZXIiLCJoaXN0b3J5Il0sIm1hcHBpbmdzIjoiQUFBQSwwY0FFTUEsc0JBQ0osU0FBQUEsRUFBQUMsR0FBc0YsSUFBeEVDLEVBQXdFRCxFQUF4RUMsaUJBQWtCQyxFQUFzREYsRUFBdERFLGNBQWVDLEVBQXVDSCxFQUF2Q0csbUJBQW9CQyxFQUFtQkosRUFBbkJJLGdCQUFtQkMsZ0JBQUFDLEtBQUFQLEdBQ3BGTyxLQUFLQyxTQUFXQyxTQUFTQyxpQkFBVCxJQUFBQyxPQUE4QlQsSUFDOUNLLEtBQUtLLE1BQVFILFNBQVNDLGlCQUFULElBQUFDLE9BQThCUixJQUMzQ0ksS0FBS0gsbUJBQXFCQSxFQUMxQkcsS0FBS0YsZ0JBQWtCQSxFQUp6QkUsS0FBQU0sVUFBc0ZOLEtBQXhFTCxVQUF3RUssS0FBdERKLDZEQVdoQyxXQVhzRkksS0FBQU0sVUFBQUosU0FBQUssU0FBQUMsbUNBRXBGLFdBQ0FSLEtBQUtILFVBQUFBLElBQUFBLGdCQUFxQkEsS0FBQUEseUNBSTFCLFdBQ0FHLEtBQUtTLFlBQUxULEtBQUFVLFVBQUFDLElBQUEscUNBZUYsV0FBZ0IsSUFBQUMsRUFBQVosS0FDZEEsS0FBS2EsZUFDTGIsS0FBS2MsZUFiTGQsS0FBQWUsaUJBQ0RmLEtBQUFDLFNBQUFlLFNBQUEsU0FBQUMsR0FlR0EsRUFBUUMsVUFBVUMsT0FBT1AsRUFBS2Ysb0JBQzFCb0IsRUFBUUcsUUFBUUMsTUFBUVQsRUFBS0gsYUFDL0JRLEVBZk5DLFVBQUFJLElBQUFWLEVBQWVmLHVEQW9CZixXQWhCQSxJQUFBMEIsRUFBQXZCLEtBQ0VBLEtBQUFLLE1BQUtJLFNBQUwsU0FBQWUsR0FDREEsRUFBQU4sVUFBQUMsT0FBQUksRUFBQXpCLGlCQWlCTzBCLEVBQUtKLFFBQVFDLE1BQVFFLEVBQUtkLGFBQzVCZSxFQUFLTixVQUFVSSxJQUFJQyxFQUFLekIscURBZDVCLFdBQUtnQixJQUFBQSxFQUFBQSxLQUNMZCxLQUFBSyxNQUFLVSxTQUFBQSxTQUFBQSxHQUNMUyxFQUFLdkIsaUJBQWlCLFNBQUEsV0FDcEJnQixRQUFRQyxVQUFVQyxLQUFsQixLQUE2QkssRUFBQzNCLFFBQUFBLFNBb0I1QjRCLEVBQUtDLGdCQW5CUEQsRUFBSVIsbUJBQ0ZBLE9BQUFBLFNBQVFDLEVBQVIsNkJBeUJOLFdBQ0VsQixLQUFLYSxlQXJCWWIsS0FBQWMsZUF1QmpCZCxLQUFLZSxpQkF0QkxmLEtBQUEwQixnQkFDRUYsS0FBQUEsbUJBd0JGeEIsS0FBSzJCLDZCQXBCSnpCLFNBTEQwQixpQkFBQSxvQkFBQSxXQStCbUIsSUFBSW5DLFdBQVcsQ0FDcENFLGlCQUFrQixhQUNsQkMsY0F6QkEsa0JBQW9CQyxtQkFBQSw2QkEyQnBCQyxnQkFBaUIsMEJBeEJYK0IiLCJmaWxlIjoiZXhwb3NpdGlvbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcclxuXHJcbmNsYXNzIEV4cG9zaXRpb24ge1xyXG4gIGNvbnN0cnVjdG9yKHsgYXJ0aWNsZXNTZWxlY3RvciwgbGlua3NTZWxlY3RvciwgYXJ0aWNsZUFjdGl2ZUNsYXNzLCBsaW5rQWN0aXZlQ2xhc3MgfSkge1xyXG4gICAgdGhpcy5hcnRpY2xlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYC4ke2FydGljbGVzU2VsZWN0b3J9YCk7XHJcbiAgICB0aGlzLmxpbmtzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChgLiR7bGlua3NTZWxlY3Rvcn1gKTtcclxuICAgIHRoaXMuYXJ0aWNsZUFjdGl2ZUNsYXNzID0gYXJ0aWNsZUFjdGl2ZUNsYXNzO1xyXG4gICAgdGhpcy5saW5rQWN0aXZlQ2xhc3MgPSBsaW5rQWN0aXZlQ2xhc3M7XHJcblxyXG4gICAgdGhpcy51cmxTdHJpbmc7XHJcbiAgICB0aGlzLnVybFBhcmFtcztcclxuICAgIHRoaXMuY3VycmVudFBhZ2U7XHJcbiAgfVxyXG5cclxuICBnZXRVcmxTdHJpbmcoKSB7XHJcbiAgICB0aGlzLnVybFN0cmluZyA9IGRvY3VtZW50LmxvY2F0aW9uLnNlYXJjaDtcclxuICB9XHJcblxyXG4gIGdldFVybFBhcmFtcygpIHtcclxuICAgIHRoaXMudXJsUGFyYW1zID0gbmV3IFVSTFNlYXJjaFBhcmFtcyh0aGlzLnVybFN0cmluZyk7XHJcbiAgfVxyXG5cclxuICBnZXRDdXJyZW50UGFnZSgpIHtcclxuICAgIHRoaXMuY3VycmVudFBhZ2UgPSB0aGlzLnVybFBhcmFtcy5nZXQoJ3BhZ2UnKTtcclxuICB9XHJcblxyXG4gIGNoYW5nZUFydGljbGUoKSB7XHJcbiAgICB0aGlzLmdldFVybFN0cmluZygpO1xyXG4gICAgdGhpcy5nZXRVcmxQYXJhbXMoKTtcclxuICAgIHRoaXMuZ2V0Q3VycmVudFBhZ2UoKTtcclxuICAgIHRoaXMuYXJ0aWNsZXMuZm9yRWFjaCgoYXJ0aWNsZSkgPT4ge1xyXG4gICAgICBhcnRpY2xlLmNsYXNzTGlzdC5yZW1vdmUodGhpcy5hcnRpY2xlQWN0aXZlQ2xhc3MpO1xyXG4gICAgICBpZiAoYXJ0aWNsZS5kYXRhc2V0Lm5hbWUgPT0gdGhpcy5jdXJyZW50UGFnZSkge1xyXG4gICAgICAgIGFydGljbGUuY2xhc3NMaXN0LmFkZCh0aGlzLmFydGljbGVBY3RpdmVDbGFzcyk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgY2hhbmdlQWN0aXZlTGluaygpIHtcclxuICAgIHRoaXMubGlua3MuZm9yRWFjaCgobGluaykgPT4ge1xyXG4gICAgICBsaW5rLmNsYXNzTGlzdC5yZW1vdmUodGhpcy5saW5rQWN0aXZlQ2xhc3MpO1xyXG4gICAgICBpZiAobGluay5kYXRhc2V0Lm5hbWUgPT0gdGhpcy5jdXJyZW50UGFnZSkge1xyXG4gICAgICAgIGxpbmsuY2xhc3NMaXN0LmFkZCh0aGlzLmxpbmtBY3RpdmVDbGFzcyk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgc2V0TGlua3NMaXN0ZW5lcnMoKSB7XHJcbiAgICB0aGlzLmxpbmtzLmZvckVhY2goKGxpbmspID0+IHtcclxuICAgICAgbGluay5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICBoaXN0b3J5LnB1c2hTdGF0ZShudWxsLCBudWxsLCBsaW5rLmRhdGFzZXQuYXJ0aWNsZSk7XHJcbiAgICAgICAgdGhpcy5jaGFuZ2VBcnRpY2xlKCk7XHJcbiAgICAgICAgdGhpcy5jaGFuZ2VBY3RpdmVMaW5rKCk7XHJcbiAgICAgICAgd2luZG93LnNjcm9sbFRvKDAsIDApO1xyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgaW5pdCgpIHtcclxuICAgIHRoaXMuZ2V0VXJsU3RyaW5nKCk7XHJcbiAgICB0aGlzLmdldFVybFBhcmFtcygpO1xyXG4gICAgdGhpcy5nZXRDdXJyZW50UGFnZSgpO1xyXG4gICAgdGhpcy5jaGFuZ2VBcnRpY2xlKCk7XHJcbiAgICB0aGlzLmNoYW5nZUFjdGl2ZUxpbmsoKTtcclxuICAgIHRoaXMuc2V0TGlua3NMaXN0ZW5lcnMoKTtcclxuICB9XHJcbn1cclxuXHJcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCAoKSA9PiB7XHJcblxyXG5jb25zdCBNYWluRXhwb3NpdGlvbiA9IG5ldyBFeHBvc2l0aW9uKHtcclxuICBhcnRpY2xlc1NlbGVjdG9yOiAnanNfYXJ0aWNsZScsXHJcbiAgbGlua3NTZWxlY3RvcjogJ2pzX2FydGljbGUtbGluaycsXHJcbiAgYXJ0aWNsZUFjdGl2ZUNsYXNzOiAnZXhwb3NpdGlvbl9fYXJ0aWNsZV9hY3RpdmUnLFxyXG4gIGxpbmtBY3RpdmVDbGFzczogJ3N1Yi1tZW51X19pdGVtX2FjdGl2ZScsXHJcbn0pO1xyXG5cclxuTWFpbkV4cG9zaXRpb24uaW5pdCgpO1xyXG5cclxufSk7Il19
