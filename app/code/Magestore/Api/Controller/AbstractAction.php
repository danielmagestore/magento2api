<?php

/**
 *  Copyright © 2016 Magestore. All rights reserved.
 *  See COPYING.txt for license details.
 *
 */
namespace Magestore\Api\Controller;

/**
 * Class AbstractAction
 * @package Magestore\Api\Controller
 */
abstract class AbstractAction extends \Magento\Framework\App\Action\Action
{
    /**
     * @var \Magento\Framework\Controller\ResultFactory
     */
    protected $resultFactory;

    /**
     * @var \Magestore\Api\Helper\Data
     */
    protected $helper;

    /**
     * AbstractAction constructor.
     * @param \Magento\Framework\App\Action\Context $context
     * @param \Magestore\Api\Helper\Data $helper
     */
    public function __construct(
        \Magento\Framework\App\Action\Context $context,
        \Magestore\Api\Helper\Data $helper
    ){
        parent::__construct($context);
        $this->helper = $helper;
        $this->resultFactory = $context->getResultFactory();
    }

    /**
     * @param $data
     * @return mixed
     */
    public function createJsonResult($data){
        $resultJson = $this->resultFactory->create(\Magento\Framework\Controller\ResultFactory::TYPE_JSON);
        return $resultJson->setData($data);
    }

    /**
     * @return mixed
     */
    public function createPageResult(){
        $resultPage = $this->resultFactory->create(\Magento\Framework\Controller\ResultFactory::TYPE_PAGE);
        return $resultPage;
    }
}
