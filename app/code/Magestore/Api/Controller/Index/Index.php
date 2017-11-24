<?php

/**
 *  Copyright © 2016 Magestore. All rights reserved.
 *  See COPYING.txt for license details.
 *
 */
namespace Magestore\Api\Controller\Index;

/**
 * Class Index
 * @package Magestore\Api\Controller\Index
 */
class Index extends \Magestore\Api\Controller\AbstractAction
{
    /**
     * @return \Magento\Framework\View\Result\Page
     */
    public function execute()
    {
        $resultPage = $this->createPageResult();
        $resultPage->getLayout()->getUpdate()->removeHandle('default');
        return $resultPage;
    }
}
