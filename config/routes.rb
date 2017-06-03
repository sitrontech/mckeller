Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root 'camaleon_cms/frontend#post_type', :post_type_id=>18, :locale=>/th/, :post_type_slug=>/(who-we-are)/
  # root 'home#post'
end
