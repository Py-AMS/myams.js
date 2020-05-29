#
# Copyright (c) 2015-2019 Thierry Florac <tflorac AT ulthar.net>
# All Rights Reserved.
#
# This software is subject to the provisions of the Zope Public License,
# Version 2.1 (ZPL).  A copy of the ZPL should accompany this distribution.
# THIS SOFTWARE IS PROVIDED "AS IS" AND ANY AND ALL EXPRESS OR IMPLIED
# WARRANTIES ARE DISCLAIMED, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
# WARRANTIES OF TITLE, MERCHANTABILITY, AGAINST INFRINGEMENT, AND FITNESS
# FOR A PARTICULAR PURPOSE.
#

"""MyAMS.js package

MyAMS.js extension framework
"""

from fanstatic import Library, Resource

from pyams_utils.fanstatic import ResourceWithData


__docformat__ = 'restructuredtext'


library = Library('myams', '../pkg')


#
# MyAMS external resources
#

jquery = Resource(library, 'js/ext/jquery.js',
                  minified='js/ext/jquery.min.js',
                  bottom=True)

bootstrap_css = Resource(library, 'css/ext/bootstrap.css',
                         minified='css/ext/bootstrap.min.css')

bootstrap = Resource(library, 'js/ext/bootstrap.js',
                     minified='js/ext/bootstrap.min.js',
                     depends=(jquery,),
                     bottom=True)

fontawesome_css = Resource(library, 'css/ext/fontawesome.css',
                           minified='css/ext/fontawesome.min.css',
                           bottom=True)

fontawesome_js = ResourceWithData(library, 'js/ext/fontawesome.js',
                                  minified='js/ext/fontawesome.min.js',
                                  data={'auto-replace-svg': 'nest'},
                                  bottom=True)


#
# MyAMS bundles
#

myams_full_bundle = ResourceWithData(library, 'js/dev/myams-dev.js',
                                     minified='js/prod/myams.js',
                                     bottom=True)

myams_css = Resource(library, 'css/dev/myams.css',
                     minified='css/prod/myams.css')

myams_mini_bundle = Resource(library, 'js/dev/myams-mini-dev.js',
                             minified='js/prod/myams-mini.js',
                             depends=(jquery, bootstrap, fontawesome_css, myams_css),
                             bottom=True)

myams_mini_svg_bundle = Resource(library, 'js/dev/myams-mini-dev.js',
                                 minified='js/prod/myams-mini.js',
                                 depends=(jquery, bootstrap, fontawesome_js, myams_css),
                                 bottom=True)

myams_core_bundle = Resource(library, 'js/dev/myams-core-dev.js',
                             minified='js/prod/myams-core.js',
                             depends=(jquery, bootstrap, fontawesome_css, myams_css),
                             bottom=True)

myams_core_svg_bundle = Resource(library, 'js/dev/myams-core-dev.js',
                                 minified='js/prod/myams-core.js',
                                 depends=(jquery, bootstrap, fontawesome_js, myams_css),
                                 bottom=True)
