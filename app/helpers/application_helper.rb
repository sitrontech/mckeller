module ApplicationHelper
  def locale_link(link_text, link_path,locale) 
    class_name = I18n.locale == locale ? 'active' : '' 
    content_tag(:li,link_to(link_text, link_path), :class => class_name)
  end
end
