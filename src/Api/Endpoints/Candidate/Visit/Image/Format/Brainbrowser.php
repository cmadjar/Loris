<?php declare(strict_types=1);
/**
 * PHP Version 7
 *
 * @category API
 * @package  Loris
 * @author   Xavier Lecours Boucher <xavier.lecours@mcin.ca>
 * @license  Loris license
 * @link     https://github.com/aces/Loris
 */
namespace LORIS\Api\Endpoints\Candidate\Visit\Image\Format;

use \Psr\Http\Message\ServerRequestInterface;
use \Psr\Http\Message\ResponseInterface;
use \LORIS\Api\Endpoint;

/**
 * This class handles request to an image brainbrowser format.
 *
 * @category API
 * @package  Loris
 * @author   Xavier Lecours Boucher <xavier.lecours@mcin.ca>
 * @license  Loris license
 * @link     https://github.com/aces/Loris
 */
class Brainbrowser extends Endpoint implements \LORIS\Middleware\ETagCalculator
{

    /**
     * The requested Image
     *
     * @var \LORIS\Image
     */
    protected $image;

    /**
     * Contructor
     *
     * @param \LORIS\Image $image The requested image
     */
    public function __construct(\LORIS\Image $image)
    {
        error_log(print_r($image, true));
        $this->image = $image;
    }

    /**
     * Return which methods are supported by this endpoint.
     *
     * @return array supported HTTP methods
     */
    protected function allowedMethods() : array
    {
        return array('GET');
    }

    /**
     * Versions of the LORIS API which are supported by this
     * endpoint.
     *
     * @return array a list of supported API versions.
     */
    protected function supportedVersions() : array
    {
        return array(
                'v0.0.2',
                'v0.0.3-dev',
               );
    }

    /**
     * Delegates the request to a private handler appropriate to the requets's
     * method.
     *
     * @param ServerRequestInterface $request The incoming PSR7 request
     *
     * @return ResponseInterface The outgoing PSR7 response
     */
    public function handle(ServerRequestInterface $request) : ResponseInterface
    {
        switch ($request->getMethod()) {
        case 'GET':
            return $this->_handleGET($request);

        case 'OPTIONS':
            return (new \LORIS\Http\Response())
                ->withHeader('Allow', $this->allowedMethods());

        default:
            return new \LORIS\Http\Response\MethodNotAllowed(
                $this->allowedMethods()
            );

        }
    }

    /**
     * Create an array representation of this endpoint's reponse body
     *
     * @param ServerRequestInterface $request The incoming PSR7 request
     *
     * @return ResponseInterface The outgoing PSR7 response
     */
    private function _handleGET(ServerRequestInterface $request): ResponseInterface
    {
        if (!isset($this->cache)) {
            $info = $this->image->getFileInfo();

            if (!$info->isFile()) {
                error_log('file in database but not in file system');
                return new \LORIS\Http\Response\NotFound();
            }

            if (!$info->isReadable()) {
                error_log('file exist but is not readable by webserver');
                return new \LORIS\Http\Response\NotFound();
            }

            $view = (new \LORIS\Api\Views\Visit\Image\Format\Brainbrowser(
                $this->image
            ))->toArray();

            $this->cache = new \LORIS\Http\Response\JsonResponse($view);
        }
        return $this->cache;
    }

    /**
     * Implements the ETagCalculator interface
     *
     * @param ServerRequestInterface $request The PSR7 incoming request.
     *
     * @return string etag summarizing value of this request.
     */
    public function ETag(ServerRequestInterface $request) : string
    {
        return md5(json_encode($this->_handleGET($request)->getBody()));
    }
}

