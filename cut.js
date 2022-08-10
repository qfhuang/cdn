
        // 销售利润率计算器
        // SKU 采购成本 重量 售价 实收 平台费 头程 尾程 海外仓操作 利润 利润率
        var tTable = convertPurchaseTable($html);
        var tArray = tTable.table;
        clearData(tArray);


        if (tTable.variation==true)
        {
            // 提取变体列
            var varColArray = uniq2(tArray.map(v => {return v.variation}));
        }
        else
        {

        }

        var data = [
            {
                "name":       "Tiger Nixon",
                "position":   "System Architect",
                "salary":     "$3,120",
                "start_date": "2011/04/25",
                "office":     "Edinburgh",
                "extn":       "5421"
            },
            {
                "name":       "Garrett Winters",
                "position":   "Director",
                "salary":     "$5,300",
                "start_date": "2011/07/25",
                "office":     "Edinburgh",
                "extn":       "8422"
            }
        ]

        //              $('#CenterPanelInternal').append('<table id="table_id" class="display"></table>');
        //              $('#table_id').DataTable( {
        //                  data: data,
        //                  columns: [
        //                      { data: 'name' },
        //                      { data: 'position' },
        //                      { data: 'salary' },
        //                     { data: 'office' }
        //                 ]
        //            } );


  
