module Themes::Landed::MainHelper
  def self.included(klass)
    klass.helper_method [:my_helper_method] rescue "" # here your methods accessible from views
  end

  def landed_settings(theme)
    # callback to save custom values of fields added in my_theme/views/admin/settings.html.erb
  end

  # callback called after theme installed
  def landed_on_install_theme(theme)


    

    # # Sample Meta Value
    theme.set_meta("installed_at", Time.current.to_s) # save a custom value
  
  end

  # callback executed after theme uninstalled
  def landed_on_uninstall_theme(theme)
  end
end
