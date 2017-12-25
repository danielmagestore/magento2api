/*
 * Copyright © 2017 Magestore. All rights reserved.
 * See COPYING.txt for license details.
 */

define(
    [
        'ko',
        'jquery',
        'mage/translate',
    ],
    function (ko, $, __) {
        "use strict";

        var SearchCriteriaBuilder = {
            conditionTypes: ko.observableArray([
                {text: __('Equals'),value: 'eq'},
                {text: __('Finset'),value:'finset'},
                {text: __('From'),value:'from'},
                {text: __('Greater than'),value:'gt'},
                {text: __('Greater than or equal'),value:'gteq'},
                {text: __('In'),value:'in'},
                {text: __('Like'),value:'like'},
                {text: __('Less than'),value:'lt'},
                {text: __('Less than or equal'),value:'lteq'},
                {text: __('More or equal'),value:'moreq'},
                {text: __('Not equal'),value:'neq'},
                {text: __('Not in'),value:'nin'},
                {text: __('Not null'),value:'notnull'},
                {text: __('Null'),value:'null'},
                {text: __('To'),value:'to'}
            ]),
            directions: ko.observableArray([
                {text: __('DESC'),value: 'desc'},
                {text: __('ASC'),value:'asc'}
            ]),
            filterGroups: ko.observableArray(),
            sortOrders: ko.observableArray(),
            pageSize: ko.observable(),
            currentPage: ko.observable(),
            initialize: function () {
                var self = this;
                return self;
            },
            addToUrl: function(url){
                var self = this;
                var filterGroups = self.filterGroups();
                var sortOrders = self.sortOrders();
                var pageSize = self.pageSize();
                var currentPage = self.currentPage();
                var querySearchStringArray = [];
                var numerGroup = 0;

                if(filterGroups && (filterGroups.length > 0)){
                    $.each(filterGroups, function (groupIndex, filterGroup) {
                        if(filterGroup && (filterGroup.filter().length > 0)){
                            $.each(filterGroup.filter(), function (filterIndex, filter) {
                                if(filter.field != ""){
                                    querySearchStringArray.push('searchCriteria[filter_groups][' + groupIndex + '][filters][' + filterIndex + '][field]=' + filter.field);
                                    querySearchStringArray.push('searchCriteria[filter_groups][' + groupIndex + '][filters][' + filterIndex + '][value]=' + filter.value);
                                    querySearchStringArray.push('searchCriteria[filter_groups][' + groupIndex + '][filters][' + filterIndex + '][condition_type]=' + filter.condition);
                                }
                            });
                        }
                    });
                }

                if(sortOrders && (sortOrders.length > 0)){
                    $.each(sortOrders, function (index, sortOrder) {
                        if(sortOrder.field != ""){
                            querySearchStringArray.push('searchCriteria[sortOrders][' + index + '][field]=' + sortOrder.field);
                            querySearchStringArray.push('searchCriteria[sortOrders][' + index + '][direction]=' + sortOrder.direction);
                        }
                    });
                }

                if (pageSize) {
                    querySearchStringArray.push('searchCriteria[pageSize]=' + pageSize);
                }

                if (currentPage) {
                    querySearchStringArray.push('searchCriteria[currentPage]=' + currentPage);
                }

                if(url && (querySearchStringArray.length > 0)){
                    var querySearchString = querySearchStringArray.join('&');
                    if(url.indexOf('?') >= 0){
                        url = url+ '&' + encodeURI(querySearchString);
                    }else{
                        url = url + '?' + encodeURI(querySearchString);
                    }
                }
                return url;
            }
        };
        return SearchCriteriaBuilder.initialize();
    }
);
