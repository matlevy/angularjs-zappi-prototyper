require 'compass/import-once/activate'
# Require any additional compass plugins here.

sass_dir = "sass"

# Set this to the root of your project when deployed:
http_path = "/"

css_dir = "dist/css/"
images_dir = "app/assets/images/"
javascripts_dir = "app/assets/javascripts"

http_stylesheets_path = "/assets/"
http_images_path = ""
http_javascripts_path = "/assets/"

asset_cache_buster :none

use_image_helper_on_output = true

# You can select your preferred output style here (can be overridden via the command line):
# output_style = :expanded or :nested or :compact or :compressed

# To enable relative paths to assets via compass helper functions. Uncomment:
# relative_assets = true

# To disable debugging comments that display the original location of your selectors. Uncomment:
# line_comments = false


# If you prefer the indented syntax, you might want to regenerate this
# project again passing --syntax sass, or you can uncomment this:
# preferred_syntax = :sass
# and then run:
# sass-convert -R --from scss --to sass sass scss && rm -rf sass && mv scss sass
